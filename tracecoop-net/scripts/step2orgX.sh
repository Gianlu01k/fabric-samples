#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# This script is designed to be run in the org3cli container as the
# second step of the EYFN tutorial. It joins the org3 peers to the
# channel previously setup in the BYFN tutorial and install the
# chaincode as version 2.0 on peer0.org3.
#

echo
echo "========= Getting new Org on to your first network ========= "
echo
CHANNEL_NAME="$1"
DOMAIN="$2"
DELAY="$3"
CC_SRC_LANGUAGE="$4"
TIMEOUT="$5"
VERBOSE="$6"
N_ORG="$7"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${CC_SRC_LANGUAGE:="javascript"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=5
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

# import utils
. scripts/utils.sh $N_ORG $DOMAIN

echo "Fetching channel config block from orderer..."
set -x
peer channel fetch 0 $CHANNEL_NAME.block -o orderer.master.com:7050 -c $CHANNEL_NAME --tls --cafile $ORDERER_CA >&log.txt
res=$?
set +x
cat log.txt
verifyResult $res "Fetching config block from orderer has Failed"

joinChannelWithRetry 0 $N_ORG $DOMAIN
echo "===================== peer0.org$N_ORG joined channel '$CHANNEL_NAME' ===================== "

 	## at first we package the chaincode
 	packageChaincode 1 0 $N_ORG $DOMAIN

 	## Install chaincode on peer0.org0
 	echo "Installing chaincode on peer0.org$N_ORG..."
 	installChaincode 1 0 $N_ORG $DOMAIN

 	## query whether the chaincode is installed
 	queryInstalled 1 0 $N_ORG $DOMAIN

	queryCommitted 1 0 $N_ORG $DOMAIN
 	## approve the definition for org0
	approveForMyOrg 1 0 $N_ORG $DOMAIN 1

 	## now that we know for sure both orgs have approved, commit the definition
	chaincodeQuery 0 $N_ORG $DOMAIN
 	## query on both orgs to see that the definition committed successfully
 	
 	

echo
echo "========= Finished adding Org$N_ORG to your first network! ========= "
echo

exit 0