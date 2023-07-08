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
: ${N_ORG:="2"}
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
	setGlobals 0 1 

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
    for i in $(seq 1 $((N_ORG))); do
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

i=1
while [ $i -le $((N_ORG)) ]
do
## Set the anchor peers for each org in the channel
echo "Updating anchor peers for org$i..."
updateAnchorPeers 0 $i
i=$((i+1))
done

 	## at first we package the chaincode
 	packageChaincode 1 0 1 $DOMAIN

 	## Install chaincode on peer0.org1
 	echo "Installing chaincode on peer0.org1..."
 	installChaincode 0 1 $DOMAIN

 	## query whether the chaincode is installed
 	queryInstalled 0 1 $DOMAIN

 	## approve the definition for org1
 	approveForMyOrg 1 0 1 $DOMAIN

 	## check whether the chaincode definition is ready to be committed
     ## expect org1 to have approved and org2 not to
 	#checkCommitReadiness 1 0 1 $DOMAIN "\"Org1MSP\": true"

 	# ## now approve also for org2
 	# approveForMyOrg 1 0 2 

 	# ## check whether the chaincode definition is ready to be committed
 	# ## expect them both to have approved
 	# checkCommitReadiness 1 0 1 $DOMAIN "\"Org1MSP\": true"

 	## now that we know for sure both orgs have approved, commit the definition
 	commitChaincodeDefinition 1 0 1 $DOMAIN

 	## query on both orgs to see that the definition committed successfully
 	queryCommitted 1 0 1 $DOMAIN
 	
 	# invoke init
 	chaincodeInvoke 1 0 1 $DOMAIN
 	# Query chaincode on peer0.org1
 	echo "Querying chaincode on peer0.org1..."
 	chaincodeQuery 0 1 $DOMAIN

 	# # Invoke chaincode on peer0.org1 and peer0.org2
 	# echo "Sending invoke transaction on peer0.org1 peer0.org2..."
 	# chaincodeInvoke 0 0 1 0 2

 	# # Query chaincode on peer0.org1
 	# echo "Querying chaincode on peer0.org1..."
 	# chaincodeQuery 0 1 90

 	# # Query on chaincode on peer1.org2, check if the result is 90
 	# echo "Querying chaincode on peer1.org2..."
 	# chaincodeQuery 1 2 90

echo
echo "========== Init chaincode done =========================="
echo	
## at first we package the chaincode
 	packageChaincode 2 0 1 $DOMAIN

 	## Install chaincode on peer0.org1
 	echo "Installing chaincode on peer0.org1..."
 	installChaincode 0 1 $DOMAIN

 	## query whether the chaincode is installed
 	queryInstalled 0 1 $DOMAIN

 	## approve the definition for org1
 	approveForMyOrg 2 0 1 $DOMAIN

 	## check whether the chaincode definition is ready to be committed
     ## expect org1 to have approved and org2 not to
 	#checkCommitReadiness 1 0 1 $DOMAIN "\"Org1MSP\": true"

 	# ## now approve also for org2
 	# approveForMyOrg 1 0 2 

 	# ## check whether the chaincode definition is ready to be committed
 	# ## expect them both to have approved
 	# checkCommitReadiness 1 0 1 $DOMAIN "\"Org1MSP\": true"

 	## now that we know for sure both orgs have approved, commit the definition
 	commitChaincodeDefinition 2 0 1 $DOMAIN

 	## query on both orgs to see that the definition committed successfully
 	queryCommitted 2 0 1 $DOMAIN
 	
 	# invoke init
 	chaincodeInvokeCreate 1 0 1 $DOMAIN
 	# Query chaincode on peer0.org1
 	echo "Querying chaincode on peer0.org1..."
 	chaincodeQuery 0 1 $DOMAIN

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