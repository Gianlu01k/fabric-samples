#!/bin/bash

N_ORG="$1"

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json 
}

function yaml_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

i=1

while [ $i -le $N_ORG ]
do

P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM="crypto-config/peerOrganizations/org$i.example.com/tlsca/tlsca.org$i.example.com-cert.pem"
CAPEM="crypto-config/peerOrganizations/org$i.example.com/ca/ca.org$i.example.com-cert.pem"

echo "$(json_ccp $i $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > "connection-org$i.json"
echo "$(yaml_ccp $i $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > "connection-org$i.yaml"

P0PORT=$((P0PORT + 2000))
P1PORT=$((P1PORT + 2000))
CAPORT=$((CAPORT + 1000))

i=$((i+1))

done