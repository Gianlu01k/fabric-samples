#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "Build your first network (BYFN) end-to-end test"
echo
CHANNEL_NAME="$2"
DELAY="$4"
CC_SRC_LANGUAGE="javascript"
TIMEOUT="$6"
VERBOSE="$7"
NO_CHAINCODE="$8"
N_ORG="$1"
DOMAIN="$3"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${CC_SRC_LANGUAGE:="javascript"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
: ${NO_CHAINCODE:="true"}
: ${N_ORG:="1"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=20
PACKAGE_ID=""

if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang" ]; then
	CC_RUNTIME_LANGUAGE=golang
	CC_SRC_PATH="github.com/hyperledger/fabric-samples/chaincode/abstore/go/"
elif [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH="/opt/gopath/src/github.com/hyperledger/fabric-samples/chaincode/fabprod/javascript/"
elif [ "$CC_SRC_LANGUAGE" = "java" ]; then
	CC_RUNTIME_LANGUAGE=java
	CC_SRC_PATH="/opt/gopath/src/github.com/hyperledger/fabric-samples/chaincode/abstore/java/"
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, javascript, java
	exit 1
fi


echo "Channel name : "$CHANNEL_NAME

# import utils
. scripts/utils.sh $N_ORG $DOMAIN

createChannel() {
	setGlobals 0 $N_ORG

	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
                set -x
		peer channel create -o orderer.${DOMAIN}.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx >&log.txt
		res=$?
                set +x
	else
				set -x
		peer channel create -o orderer.${DOMAIN}.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
		res=$?
				set +x
	fi
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}

joinChannel () {
    for i in $(seq 0 $((N_ORG))); do
		joinChannelWithRetry 0 $i
		echo "===================== peer0.org${i} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	done
}

## Create channel
echo "Creating channel..."
createChannel

## Join all the peers to the channel
echo "Having all peers join the channel..."
joinChannel

i=0
while [ $i -le $((N_ORG)) ]
do
## Set the anchor peers for each org in the channel
echo "Updating anchor peers for org$i..."
updateAnchorPeers 0 $i
i=$((i+1))
done

echo "========== Init chaincode start =========================="
 	## at first we package the chaincode
 	packageChaincode 1 0 $N_ORG $DOMAIN

 	## Install chaincode on peer0.org0
 	echo "Installing chaincode on peer0.org0..."
 	installChaincode 1 0 $N_ORG $DOMAIN

 	## query whether the chaincode is installed
 	queryInstalled 1 0 $N_ORG $DOMAIN

 	## approve the definition for org0
 	approveForMyOrg 1 0 $N_ORG $DOMAIN 1
    checkCommitReadiness 1 0 $N_ORG $DOMAIN "\"Org0MSP\": true" 1
 	## now that we know for sure both orgs have approved, commit the definition
 	commitChaincodeDefinition 1 0 $N_ORG $DOMAIN 1

 	## query on both orgs to see that the definition committed successfully
 	queryCommitted 1 0 $N_ORG $DOMAIN
 	
 	# invoke init
 	chaincodeInvoke 1 0 $N_ORG $DOMAIN
 	# Query chaincode on peer0.org0
 	echo "Querying chaincode on peer0.org0..."
 	chaincodeQuery 0 $N_ORG $DOMAIN

echo
echo "========== Init chaincode done =========================="

echo
echo "========= All GOOD, BYFN execution completed =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo

exit 0