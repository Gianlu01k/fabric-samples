#!/bin/bash

N_ORG="$1"
DOMAIN="$2"

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
        -e "s#\${DOMAIN}#$DOMAIN#" \
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
        -e "s#\${DOMAIN}#$DOMAIN#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

P0PORT=$((7051+2000*$N_ORG))
P1PORT=$((P0PORT+1000))
CAPORT=7054
echo $PWD
PEERPEM="org3-artifacts/crypto-config/peerOrganizations/org$N_ORG.${DOMAIN}.com/tlsca/tlsca.org$N_ORG.${DOMAIN}.com-cert.pem"
CAPEM="org3-artifacts/crypto-config/peerOrganizations/org$N_ORG.${DOMAIN}.com/ca/ca.org$N_ORG.${DOMAIN}.com-cert.pem"

echo "$(json_ccp $N_ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > "connection-org$N_ORG.json"
echo "$(yaml_ccp $N_ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > "connection-org$N_ORG.yaml"
