export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer0.org1.master.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-config/peerOrganizations/org1.master.com/users/Admin@org1.master.com/msp
export CORE_PEER_ADDRESS=localhost:7051

export PATH=$PATH:$PWD/../bin/

export FABRIC_CFG_PATH=$PWD/../config/
export ORDERER_CA=${PWD}/crypto-config/ordererOrganizations/master.com/orderers/orderer.master.com/msp/tlscacerts/tlsca.master.com-cert.pem

export PATH=$PATH:${PWD}/../bin
export FABRIC_CA_CLIENT_HOME=${PWD}/crypto-config/peerOrganizations/org1.master.com/
echo 1
fabric-ca-client register --caname ca-org1 --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles ${PWD}/crypto-config/fabric-ca/org1/tls-cert.pem
echo 2
mkdir -p crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com
echo 3
fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7054 --caname ca-org1 -M ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/msp --csr.hosts peer1.org1.master.com --tls.certfiles ${PWD}/crypto-config/fabric-ca/org1/tls-cert.pem
echo 4
cp ${PWD}/crypto-config/peerOrganizations/org1.master.com/msp/config.yaml ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/msp/config.yaml
echo 5
fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7054 --caname ca-org1 -M ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls --enrollment.profile tls --csr.hosts peer1.org1.master.com --csr.hosts localhost --tls.certfiles ${PWD}/crypto-config/fabric-ca/org1/tls-cert.pem
echo 6
cp ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/tlscacerts/* ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/ca.crt
echo 7
cp ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/signcerts/* ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/server.crt
echo 
cp ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/keystore/* ${PWD}/crypto-config/peerOrganizations/org1.master.com/peers/peer1.org1.master.com/tls/server.key