#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# This script is designed to be run in the org3cli container as the
# first step of the EYFN tutorial.  It creates and submits a
# configuration transaction to add org3 to the network previously
# setup in the BYFN tutorial.
#

NEXT_ORG="$1"
NEXT_PORT="$2"
DOMAIN="$3"
CHANNEL_NAME="$4"
DELAY="$5"
CC_SRC_LANGUAGE="$6"
TIMEOUT="$7"
VERBOSE="$8"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${CC_SRC_LANGUAGE:="javascript"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=5

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
. scripts/utils.sh $NEXT_ORG $DOMAIN


echo
echo "========= Creating config transaction to add org$NEXT_ORG to network =========== "
echo

# Fetch the config for the channel, writing it to config.json
fetchChannelConfig ${CHANNEL_NAME} config.json

# Modify the configuration to append the new org
set -x
jq -s '.[0] * {"channel_group":{"groups":{"Application":{"groups": {'Org${NEXT_ORG}MSP':.[1]}}}}}' config.json ./channel-artifacts/org$NEXT_ORG.json > modified_config.json
set +x

# Compute a config update, based on the differences between config.json and modified_config.json, write it as a transaction to org3_update_in_envelope.pb
createConfigUpdate ${CHANNEL_NAME} config.json modified_config.json org${NEXT_ORG}_update_in_envelope.pb

echo
echo "========= Config transaction to add org$NEXT_ORG to network created ===== "
echo

echo "Signing config transaction"

echo "$N_ORG $DOMAIN"
echo
signConfigtxAsPeerOrg 0 org${NEXT_ORG}_update_in_envelope.pb master

	echo
	echo "========= Submitting transaction from a different peer (peer0.org0) which also signs it ========= "
	echo
	setGlobals 0 0 master
	set -x
	peer channel update -f org${NEXT_ORG}_update_in_envelope.pb -c ${CHANNEL_NAME} -o orderer.master.com:7050 --tls --cafile ${ORDERER_CA}
	set +x

echo
echo "========= Config transaction to add org1 to network submitted! =========== "
exit 0