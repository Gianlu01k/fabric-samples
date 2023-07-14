#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This script will orchestrate a sample end-to-end execution of the Hyperledger
# Fabric network.
#
# The end-to-end verification provisions a sample Fabric network consisting of
# two organizations, each maintaining two peers, and a Raft ordering service.
#
# This verification makes use of two fundamental tools, which are necessary to
# create a functioning transactional network with digital signature validation
# and access control:
#
# * cryptogen - generates the x509 certificates used to identify and
#   authenticate the various components in the network.
# * configtxgen - generates the requisite configuration artifacts for orderer
#   bootstrap and channel creation.
#
# Each tool consumes a configuration yaml file, within which we specify the topology
# of our network (cryptogen) and the location of our certificates for various
# configuration operations (configtxgen).  Once the tools have been successfully run,
# we are able to launch our network.  More detail on the tools and the structure of
# the network will be provided later in this document.  For now, let's get going...

# prepending $PWD/../bin to PATH to ensure we are picking up the correct binaries
# this may be commented out to resolve installed version of tools if desired

export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export VERBOSE=false
DOMAIN="master"

# Print the usage message
function printHelp() {
  echo "Usage: "
  echo "  byfn.sh <mode> [-c <channel name>] [-t <timeout>] [-d <delay>] [-f <docker-compose-file>] [-s <dbtype>] [-l <language>] [-o <consensus-type>] [-i <imagetag>] [-a] [-n] [-v]"
  echo "    <mode> - one of 'up', 'down', 'restart', 'generate' or 'upgrade'"
  echo "      - 'up' - bring up the network with docker-compose up"
  echo "      - 'down' - clear the network with docker-compose down"
  echo "      - 'restart' - restart the network"
  echo "      - 'generate' - generate required certificates and genesis block"
  echo "      - 'upgrade'  - upgrade the network from version 1.3.x to 1.4.0"
  echo "    -c <channel name> - channel name to use (defaults to \"mychannel\")"
  echo "    -t <timeout> - CLI timeout duration in seconds (defaults to 10)"
  echo "    -d <delay> - delay duration in seconds (defaults to 3)"
  echo "    -s <dbtype> - the database backend to use: goleveldb (default) or couchdb"
  echo "    -l <language> - the programming language of the chaincode to deploy: go (default), javascript, or java"
  echo "    -i <imagetag> - the tag to be used to launch the network (defaults to \"latest\")"
  echo "    -a - launch certificate authorities (no certificate authorities are launched by default)"
  echo "    -n - do not deploy chaincode (abstore chaincode is deployed by default)"
  echo "    -v - verbose mode"
  echo "  byfn.sh -h (print this message)"
  echo
  echo "Typically, one would first generate the required certificates and "
  echo "genesis block, then bring up the network. e.g.:"
  echo
  echo "	byfn.sh generate -c mychannel"
  echo "	byfn.sh up -c mychannel -s couchdb"
  echo "        byfn.sh up -c mychannel -s couchdb -i 1.4.0"
  echo "	byfn.sh up -l javascript"
  echo "	byfn.sh down -c mychannel"
  echo "        byfn.sh upgrade -c mychannel"
  echo
  echo "Taking all defaults:"
  echo "	byfn.sh generate"
  echo "	byfn.sh up"
  echo "	byfn.sh down"
}

# Ask user for confirmation to proceed
function askProceed() {
  read -p "Continue? [Y/n] " ans
  case "$ans" in
  y | Y | "")
    echo "proceeding ..."
    ;;
  n | N)
    echo "exiting..."
    exit 1
    ;;
  *)
    echo "invalid response"
    askProceed
    ;;
  esac
}

# Obtain CONTAINER_IDS and remove them
# TODO Might want to make this optional - could clear other containers
function clearContainers() {
  CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')
  if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
    echo "---- No containers available for deletion ----"
  else
    docker rm -f $CONTAINER_IDS
  fi
}

# Delete any images that were generated as a part of this setup
# specifically the following images are often left behind:
# TODO list generated image naming patterns
function removeUnwantedImages() {
  DOCKER_IMAGE_IDS=$(docker images | awk '($1 ~ /dev-peer.*/) {print $3}')
  if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
    echo "---- No images available for deletion ----"
  else
    docker rmi -f $DOCKER_IMAGE_IDS
  fi
}

# Versions of fabric known not to work with this release of tracecoop-net
BLACKLISTED_VERSIONS="^1\."

# Do some basic sanity checking to make sure that the appropriate versions of fabric
# binaries/images are available.  In the future, additional checking for the presence
# of go or other items could be added.
function checkPrereqs() {
  # Note, we check configtxlator externally because it does not require a config file, and peer in the
  # docker image because of FAB-8551 that makes configtxlator return 'development version' in docker
  LOCAL_VERSION=$(configtxlator version | sed -ne 's/ Version: //p')
  DOCKER_IMAGE_VERSION=$(docker run --rm hyperledger/fabric-tools:$IMAGETAG peer version | sed -ne 's/ Version: //p' | head -1)

  echo "LOCAL_VERSION=$LOCAL_VERSION"
  echo "DOCKER_IMAGE_VERSION=$DOCKER_IMAGE_VERSION"

  if [ "$LOCAL_VERSION" != "$DOCKER_IMAGE_VERSION" ]; then
    echo "=================== WARNING ==================="
    echo "  Local fabric binaries and docker images are  "
    echo "  out of  sync. This may cause problems.       "
    echo "==============================================="
  fi

  for UNSUPPORTED_VERSION in $BLACKLISTED_VERSIONS; do
    echo "$LOCAL_VERSION" | grep -q $UNSUPPORTED_VERSION
    if [ $? -eq 0 ]; then
      echo "ERROR! Local Fabric binary version of $LOCAL_VERSION does not match this newer version of BYFN and is unsupported. Either move to a later version of Fabric or checkout an earlier version of fabric-samples."
      exit 1
    fi

    echo "$DOCKER_IMAGE_VERSION" | grep -q $UNSUPPORTED_VERSION
    if [ $? -eq 0 ]; then
      echo "ERROR! Fabric Docker image version of $DOCKER_IMAGE_VERSION does not match this newer version of BYFN and is unsupported. Either move to a later version of Fabric or checkout an earlier version of fabric-samples."
      exit 1
    fi
  done
}

# Generate the needed certificates, the genesis block and start the network.
function networkUp() {
  networkDown
  checkPrereqs
  # generate artifacts if they don't exist
  if [ ! -d "crypto-config" ]; then
    generateCerts
    generateChannelArtifacts
  fi

  i=0
  NEW_LINES1=""
  NEW_LINES2=""
  NEW_LINES3=""

  while [ $i -le $N_ORG ]
  do

   NEW_LINES1+="  peer0.org$i.${DOMAIN}.com:\n"
   NEW_LINES2+="  peer0.org$i.${DOMAIN}.com:\n    container_name: peer0.org$i.${DOMAIN}.com\n    extends:\n      file:  base/docker-compose-base.yaml\n      service: peer0.org$i.${DOMAIN}.com\n    networks:\n      - byfn\n\n"
   NEW_LINES3+="      - peer0.org$i.${DOMAIN}.com\n"

  i=$((i+1))
  done

  sed -e "s/\${DOMAIN}/$DOMAIN/g" -e "s@ORGS_AND_PEERS_VOLUMES@$NEW_LINES1@g" -e "s@ORGS_AND_PEERS_SERVICES@$NEW_LINES2@g" -e "s@ORGS_AND_PEERS_DEP@$NEW_LINES3@g" docker-compose-cli-template.yaml > docker-compose-cli.yaml

  i=0
  P0PORT=7051
  NEW_LINES1=""

  while [ $i -le $N_ORG ]
  do
    P0PORTCHAIN=$((P0PORT+1))
    P0PORTBOOT=$((P0PORT+1000))

    NEW_LINES1+="  peer0.org$i.${DOMAIN}.com:\n    container_name: peer0.org$i.${DOMAIN}.com\n    extends:\n      file: peer-base.yaml\n      service: peer-base\n    environment:\n      - CORE_PEER_ID=peer0.org$i.${DOMAIN}.com\n      - CORE_PEER_ADDRESS=peer0.org$i.${DOMAIN}.com:$P0PORT\n      - CORE_PEER_LISTENADDRESS=0.0.0.0:$P0PORT\n      - CORE_PEER_CHAINCODEADDRESS=peer0.org$i.${DOMAIN}.com:$P0PORTCHAIN\n      - CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:$P0PORTCHAIN\n      - CORE_PEER_GOSSIP_BOOTSTRAP=peer0.org$i.${DOMAIN}.com:$P0PORT\n      - CORE_PEER_GOSSIP_EXTERNALENDPOINT=peer0.org$i.${DOMAIN}.com:$P0PORT\n      - CORE_PEER_LOCALMSPID=Org${i}MSP\n      - GODEBUG=netdns=go\n    volumes:\n        - /var/run/:/host/var/run/\n        - ../crypto-config/peerOrganizations/org$i.${DOMAIN}.com/peers/peer0.org$i.${DOMAIN}.com/msp:/etc/hyperledger/fabric/msp\n        - ../crypto-config/peerOrganizations/org$i.${DOMAIN}.com/peers/peer0.org$i.${DOMAIN}.com/tls:/etc/hyperledger/fabric/tls\n        - peer0.org$i.${DOMAIN}.com:/var/hyperledger/production\n    ports:\n      - $P0PORT:$P0PORT\n\n"
    P0PORT=$((P0PORT+2000))

    i=$((i+1))
  done

  sed -e "s/\${DOMAIN}/$DOMAIN/g" -e "s@ORGS_AND_PEERS_BASE@$NEW_LINES1@g" base/docker-compose-base-template.yaml > base/docker-compose-base.yaml

  NEW_ORDS_LINES1=""
  NEW_ORDS_LINES2=""
  O0PORT=7050

  j=2

  while [ $j -le $N_ORD ]
  do
    O0PORT=$((O0PORT+1000))
     NEW_ORDS_LINES1+="  orderer$j.${DOMAIN}.com:\n"
     NEW_ORDS_LINES2+="  orderer$j.${DOMAIN}.com:\n    extends:\n      file: base/peer-base.yaml\n      service: orderer-base\n    environment:\n      - ORDERER_GENERAL_LISTENPORT=$O0PORT\n    container_name: orderer$j.${DOMAIN}.com\n    networks:\n      - byfn\n    volumes:\n      - ./channel-artifacts/genesis.block:/var/hyperledger/orderer/orderer.genesis.block\n      - ./crypto-config/ordererOrganizations/${DOMAIN}.com/orderers/orderer$j.${DOMAIN}.com/msp:/var/hyperledger/orderer/msp\n      - ./crypto-config/ordererOrganizations/${DOMAIN}.com/orderers/orderer$j.${DOMAIN}.com/tls/:/var/hyperledger/orderer/tls\n      - orderer$j.${DOMAIN}.com:/var/hyperledger/production/orderer\n    ports:\n      - $O0PORT:$O0PORT\n\n"
   j=$((j+1))
  done

  sed -e "s/\${DOMAIN}/$DOMAIN/g" -e "s@ORDS_VOLUMES@$NEW_ORDS_LINES1@g" -e "s@ORDS_SERVICES@$NEW_ORDS_LINES2@g" docker-compose-etcdraft2-template.yaml > docker-compose-etcdraft2.yaml


  COMPOSE_FILES="-f ${COMPOSE_FILE} -f ${COMPOSE_FILE_RAFT2}"
  if [ "${CERTIFICATE_AUTHORITIES}" == "true" ]; then
    sed -e "s/\${DOMAIN}/$DOMAIN/g" docker-compose-ca-template.yaml > docker-compose-ca.yaml
    COMPOSE_FILES="${COMPOSE_FILES} -f ${COMPOSE_FILE_CA}"
    export BYFN_CA1_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org0.${DOMAIN}.com/ca && ls *_sk)
    # export BYFN_CA2_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/Org0.${DOMAIN}.com/ca && ls *_sk)
  fi
  if [ "${IF_COUCHDB}" == "couchdb" ]; then
    COMPOSE_FILES="${COMPOSE_FILES} -f ${COMPOSE_FILE_COUCH}"
  fi
  IMAGE_TAG=$IMAGETAG docker-compose ${COMPOSE_FILES} up -d 2>&1
  docker ps -a
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Unable to start network"
    exit 1
  fi

  echo "Sleeping 5s to allow Raft cluster to complete booting"
  sleep 5

  if [ "${NO_CHAINCODE}" != "true" ]; then
    echo Vendoring Go dependencies ...
    pushd ../chaincode/abstore/go
    GO111MODULE=on go mod vendor
    popd
    echo Finished vendoring Go dependencies
  fi

  # now run the end to end script
  docker exec cli scripts/script.sh $N_ORG $CHANNEL_NAME $DOMAIN $CLI_DELAY $CC_SRC_LANGUAGE $CLI_TIMEOUT $VERBOSE $NO_CHAINCODE 
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Test failed"
    exit 1
  fi
}

# Upgrade the network components which are at version 1.3.x to 1.4.x
# Stop the orderer and peers, backup the ledger for orderer and peers, cleanup chaincode containers and images
# and relaunch the orderer and peers with latest tag
function upgradeNetwork() {
  if [[ "$IMAGETAG" == *"1.4"* ]] || [[ $IMAGETAG == "latest" ]]; then
    docker inspect -f '{{.Config.Volumes}}' orderer.${DOMAIN}.com | grep -q '/var/hyperledger/production/orderer'
    if [ $? -ne 0 ]; then
      echo "ERROR !!!! This network does not appear to start with fabric-samples >= v1.3.x?"
      exit 1
    fi

    LEDGERS_BACKUP=./ledgers-backup

    # create ledger-backup directory
    mkdir -p $LEDGERS_BACKUP

    export IMAGE_TAG=$IMAGETAG
    COMPOSE_FILES="-f ${COMPOSE_FILE} -f ${COMPOSE_FILE_RAFT2}"
    if [ "${CERTIFICATE_AUTHORITIES}" == "true" ]; then
      COMPOSE_FILES="${COMPOSE_FILES} -f ${COMPOSE_FILE_CA}"
      export BYFN_CA1_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org0.${DOMAIN}.com/ca && ls *_sk)
      export BYFN_CA2_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/Org0.${DOMAIN}.com/ca && ls *_sk)
    fi
    if [ "${IF_COUCHDB}" == "couchdb" ]; then
      COMPOSE_FILES="${COMPOSE_FILES} -f ${COMPOSE_FILE_COUCH}"
    fi

    # removing the cli container
    docker-compose $COMPOSE_FILES stop cli
    docker-compose $COMPOSE_FILES up -d --no-deps cli

    echo "Upgrading orderer"
    docker-compose $COMPOSE_FILES stop orderer.${DOMAIN}.com
    docker cp -a orderer.${DOMAIN}.com:/var/hyperledger/production/orderer $LEDGERS_BACKUP/orderer.${DOMAIN}.com
    docker-compose $COMPOSE_FILES up -d --no-deps orderer.${DOMAIN}.com

    for PEER in peer0.org0.${DOMAIN}.com peer1.org0.${DOMAIN}.com peer0.org2.${DOMAIN}.com peer1.org2.${DOMAIN}.com; do
      echo "Upgrading peer $PEER"

      # Stop the peer and backup its ledger
      docker-compose $COMPOSE_FILES stop $PEER
      docker cp -a $PEER:/var/hyperledger/production $LEDGERS_BACKUP/$PEER/

      # Remove any old containers and images for this peer
      CC_CONTAINERS=$(docker ps | grep dev-$PEER | awk '{print $1}')
      if [ -n "$CC_CONTAINERS" ]; then
        docker rm -f $CC_CONTAINERS
      fi
      CC_IMAGES=$(docker images | grep dev-$PEER | awk '{print $1}')
      if [ -n "$CC_IMAGES" ]; then
        docker rmi -f $CC_IMAGES
      fi

      # Start the peer again
      docker-compose $COMPOSE_FILES up -d --no-deps $PEER
    done

    docker exec cli scripts/upgrade_to_v14.sh $CHANNEL_NAME $CLI_DELAY $CC_SRC_LANGUAGE $CLI_TIMEOUT $VERBOSE
    if [ $? -ne 0 ]; then
      echo "ERROR !!!! Test failed"
      exit 1
    fi
  else
    echo "ERROR !!!! Pass the v1.4.x image tag"
  fi
}

# Tear down running network
function networkDown() {
  docker system prune --volumes -f
  # stop org3 containers also in addition to Org0 and org2, in case we were running sample to add org3
  docker-compose -f $COMPOSE_FILE -f $COMPOSE_FILE_COUCH -f $COMPOSE_FILE_RAFT2 -f $COMPOSE_FILE_CA -f $COMPOSE_FILE_ORG3 down --volumes --remove-orphans



  # Don't remove the generated artifacts -- note, the ledgers are always removed
  if [ "$MODE" != "restart" ]; then
    # Bring down the network, deleting the volumes
    #Delete any ledger backups
    docker run -v $PWD:/tmp/tracecoop-net --rm hyperledger/fabric-tools:$IMAGETAG rm -Rf /tmp/tracecoop-net/ledgers-backup
    #Cleanup the chaincode containers
    clearContainers
    #Cleanup images
    removeUnwantedImages
    # remove orderer block and other channel configuration transactions and certs
    rm -rf channel-artifacts/*.block channel-artifacts/*.tx crypto-config ./orgX-artifacts/crypto-config/ channel-artifacts/org3.json
  fi
}

# We will use the cryptogen tool to generate the cryptographic material (x509 certs)
# for our various network entities.  The certificates are based on a standard PKI
# implementation where validation is achieved by reaching a common trust anchor.
#
# Cryptogen consumes a file - ``crypto-config.yaml`` - that contains the network
# topology and allows us to generate a library of certificates for both the
# Organizations and the components that belong to those Organizations.  Each
# Organization is provisioned a unique root certificate (``ca-cert``), that binds
# specific components (peers and orderers) to that Org.  Transactions and communications
# within Fabric are signed by an entity's private key (``keystore``), and then verified
# by means of a public key (``signcerts``).  You will notice a "count" variable within
# this file.  We use this to specify the number of peers per Organization; in our
# case it's two peers per Org.  The rest of this template is extremely
# self-explanatory.
#
# After we run the tool, the certs will be parked in a folder titled ``crypto-config``.

# Generates Org certs using cryptogen tool
function generateCerts() {
  which cryptogen
  if [ "$?" -ne 0 ]; then
    echo "cryptogen tool not found. exiting"
    exit 1
  fi
  echo
  echo "##########################################################"
  echo "##### Generate certificates using cryptogen tool #########"
  echo "##########################################################"

  NEW_LINES=""
  NEW_ORDS_LINES=""

  i=0
  j=2

  while [ $j -le $N_ORD ]
  do

   NEW_ORDS_LINES+="      - Hostname: orderer$j\n" 

   j=$((j+1)) 

  done

  while [ $i -le $N_ORG ]
  do

   NEW_LINES+="  \n  - Name: Org$i\n    Domain: org$i.${DOMAIN}.com\n    EnableNodeOUs: true \n    Template:  \n      Count: 1 \n    Users: \n      Count: 1\n"

   i=$((i+1))
  done

  touch org-data.txt

  echo $i > org-data.txt

  echo $((9051+N_ORG*2000)) >> org-data.txt

  sed -e "s/CREATE_ORDS/$NEW_ORDS_LINES/g" -e "s/CREATE_ORGS/$NEW_LINES/g" -e "s/\${DOMAIN}/$DOMAIN/g" crypto-config-template.yaml > crypto-config.yaml

  if [ -d "crypto-config" ]; then
    rm -Rf crypto-config
  fi
  set -x
  cryptogen generate --config=./crypto-config.yaml
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate certificates..."
    exit 1
  fi
  echo
  echo "Generate CCP files for Orgs"
  ./ccp-generate.sh $N_ORG $DOMAIN
}

function generateChannelArtifacts() {
  which configtxgen
  if [ "$?" -ne 0 ]; then
    echo "configtxgen tool not found. exiting"
    exit 1
  fi

  NEW_LINES1=""
  NEW_LINES2=""
  NEW_LINES3=""
  NEW_ORDS_LINES1=""
  NEW_ORDS_LINES2=""

  i=0
  j=2
  P0PORT=7051
  O0PORT=7050

  while [ $j -le $N_ORD ]
  do
    O0PORT=$((O0PORT+1000))
    NEW_ORDS_LINES1+="                - Host: orderer$j.${DOMAIN}.com\n                  Port: $O0PORT\n                  ClientTLSCert: crypto-config/ordererOrganizations/${DOMAIN}.com/orderers/orderer$j.${DOMAIN}.com/tls/server.crt\n                  ServerTLSCert: crypto-config/ordererOrganizations/${DOMAIN}.com/orderers/orderer$j.${DOMAIN}.com/tls/server.crt\n"  
    NEW_ORDS_LINES2+="                - orderer$j.${DOMAIN}.com:$O0PORT\n"  
    j=$((j+1))
  done

  while [ $i -le $N_ORG ]
  do
   
  NEW_LINES1+="\n    - \&Org$i\n        Name: Org${i}MSP\n        ID: Org${i}MSP\n        MSPDir: crypto-config/peerOrganizations/org${i}.${DOMAIN}.com/msp\n        Policies:\n            Readers:\n                Type: Signature\n                Rule: \"OR('Org${i}MSP.admin', 'Org${i}MSP.peer', 'Org${i}MSP.client')\"\n            Writers:\n                Type: Signature\n                Rule: \"OR('Org${i}MSP.admin', 'Org${i}MSP.client')\"\n            Admins:\n                Type: Signature\n                Rule: \"OR('Org${i}MSP.admin')\"\n            Endorsement:\n                Type: Signature\n                Rule: \"OR('Org${i}MSP.peer')\"\n        AnchorPeers:\n            - Host: peer0.org$i.${DOMAIN}.com\n              Port: $P0PORT"
  NEW_LINES2+="                - *Org$i\n"
  NEW_LINES3+="                - *Org$i\n"

   i=$((i+1))
   P0PORT=$((P0PORT+2000))
  done
  sed -e "s@ORDS_DATA@$NEW_ORDS_LINES1@g" -e "s@ORDS_ADDRS@$NEW_ORDS_LINES2@g" -e "s@ORGANIZATIONS-ORGS@$NEW_LINES1@g" -e "s@PROFILE2ORGS@$NEW_LINES2@g" -e "s@PROFILEMULTI@$NEW_LINES3@g" -e "s/\${DOMAIN}/$DOMAIN/g" configtx-template.yaml > configtx.yaml

  echo "##########################################################"
  echo "#########  Generating Orderer Genesis block ##############"
  echo "##########################################################"
  # Note: For some unknown reason (at least for now) the block file can't be
  # named orderer.genesis.block or the orderer will fail to launch!

  set -x
  configtxgen -profile SampleMultiNodeEtcdRaft -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate orderer genesis block..."
    exit 1
  fi
  echo
  echo "#################################################################"
  echo "### Generating channel configuration transaction 'channel.tx' ###"
  echo "#################################################################"
  set -x
  configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi

  i=0
  while [ $i -le $N_ORG ]
  do
    echo
    echo "#################################################################"
    echo "#######    Generating anchor peer update for Org${i}MSP   ##########"
    echo "#################################################################"
    set -x
    configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org${i}MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org${i}MSP
    res=$?
    set +x
    if [ $res -ne 0 ]; then
      echo "Failed to generate anchor peer update for Org${i}MSP..."
      exit 1
    fi
    i=$((i+1))
  done
  echo
}

function useChaincode(){
  cd scripts
  sudo bash useChaincode.sh
}

# timeout duration - the duration the CLI should wait for a response from
# another container before giving up
CLI_TIMEOUT=10
# default for delay between commands
CLI_DELAY=3
# channel name defaults to "mychannel"
CHANNEL_NAME="mychannel"
# use this as the default docker-compose yaml definition
COMPOSE_FILE=docker-compose-cli.yaml
#
COMPOSE_FILE_COUCH=docker-compose-couch.yaml
# org3 docker compose file
COMPOSE_FILE_ORG3=docker-compose-orgX.yaml
# two additional etcd/raft orderers
COMPOSE_FILE_RAFT2=docker-compose-etcdraft2.yaml
# certificate authorities compose file
COMPOSE_FILE_CA=docker-compose-ca.yaml

#
# use go as the default language for chaincode
CC_SRC_LANGUAGE=go
# default image tag
IMAGETAG="latest"
# Parse commandline args
if [ "$1" = "-m" ]; then # supports old usage, muscle memory is powerful!
  shift
fi
MODE=$1
shift
# Determine whether starting, stopping, restarting, generating or upgrading
if [ "$MODE" == "up" ]; then
  EXPMODE="Starting"
elif [ "$MODE" == "down" ]; then
  EXPMODE="Stopping"
elif [ "$MODE" == "restart" ]; then
  EXPMODE="Restarting"
elif [ "$MODE" == "generate" ]; then
  EXPMODE="Generating certs and genesis block"
elif [ "$MODE" == "upgrade" ]; then
  EXPMODE="Upgrading the network"
elif [ "$MODE" == "app" ]; then
  EXPMODE="Using chaincode"
else
  printHelp
  exit 1
fi

while getopts "h?c:t:d:s:l:i:anv:o:r:b" opt; do
  case "$opt" in
  h | \?)
    printHelp
    exit 0
    ;;
  c)
    CHANNEL_NAME=$OPTARG
    ;;
  t)
    CLI_TIMEOUT=$OPTARG
    ;;
  d)
    CLI_DELAY=$OPTARG
    ;;
  s)
    IF_COUCHDB=$OPTARG
    ;;
  l)
    CC_SRC_LANGUAGE=$OPTARG
    ;;
  i)
    IMAGETAG=$(go env GOARCH)"-"$OPTARG
    ;;
  a)
    CERTIFICATE_AUTHORITIES=true
    ;;
  n)
    NO_CHAINCODE=true
    ;;
  v)
    VERBOSE=true
    ;;
  o)
    N_ORG=$OPTARG
    ;;
  r)
    N_ORD=$OPTARG
    ;;
  b)
    DOMAIN=$OPTARG
    ;;
  esac
done


# Announce what was requested

if [ "${IF_COUCHDB}" == "couchdb" ]; then
  echo
  echo "${EXPMODE} for channel '${CHANNEL_NAME}' with CLI timeout of '${CLI_TIMEOUT}' seconds and CLI delay of '${CLI_DELAY}' seconds and using database '${IF_COUCHDB}'"
else
  echo "${EXPMODE} for channel '${CHANNEL_NAME}' with CLI timeout of '${CLI_TIMEOUT}' seconds and CLI delay of '${CLI_DELAY}' seconds"
fi
# ask for confirmation to proceed
askProceed

#Create the network using docker compose
if [ "${MODE}" == "up" ]; then
  networkUp
elif [ "${MODE}" == "down" ]; then ## Clear the network
  networkDown
elif [ "${MODE}" == "generate" ]; then ## Generate Artifacts
  generateCerts
  generateChannelArtifacts
elif [ "${MODE}" == "restart" ]; then ## Restart the network
  networkDown
  networkUp
elif [ "${MODE}" == "upgrade" ]; then ## Upgrade the network from version 1.2.x to 1.3.x
  upgradeNetwork
elif [ "${MODE}" == "app" ]; then
  useChaincode
else
  printHelp
  exit 1
fi