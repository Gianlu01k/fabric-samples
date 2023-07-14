[//]: # (SPDX-License-Identifier: CC-BY-4.0)

## Hyperledger Fabric Samples

# Documentazione Hyperledger Fabric

La seguente documentazione fornisce una guida dettagliata per la creazione di una blockchain tramite Hyperledger Fabric. Inizieremo creando una Org0 detta “master”.

## Prerequisiti

- Installare Docker:
    1. Vai al sito ufficiale di Docker (**https://www.docker.com/products/docker-desktop**) e scarica Docker Desktop per il tuo sistema operativo. 
    2. Esegui il file di installazione scaricato e segui le istruzioni guidate per completare l'installazione.
    3.  Esegui il comando seguente per verificare se Docker Desktop è installato correttamente e dovresti visualizzare le informazioni sulla versione di Docker.

```bash

docker version
```

- Installare Go:
    1. Scarica il pacchetto di installazione di Go:
    2.  Visita il sito ufficiale di Go (**https://golang.org/dl/**) per scaricare il pacchetto di installazione e seleziona il pacchetto corrispondente al tuo sistema operativo. 
    3. Per eseguire il pacchetto di installazione, apri il terminale Bash e naviga nella directory in cui hai scaricato il pacchetto di installazione di Go. 
    4. Esegui il comando seguente per avviare l'installazione indicando il nome del pacchetto <nome_pacchetto>:

```bash
sudo tar -C /usr/local -xzf <nome_pacchetto.tar.gz>

```

Configura le variabili di ambiente aggiungendo il percorso di installazione di Go alla variabile di ambiente **`PATH`** eseguendo il comando seguente:

```bash

export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
source ~/.bashrc

```

- Installare JQ:

```bash
sudo apt-get install jq

```

- Installare Node Js e npm su Linux
    
    Per installare Node.js e npm su Linux, è possibile utilizzare il gestore di pacchetti del proprio sistema operativo. Ecco come fare per alcune distribuzioni:
    
    - Debian, Ubuntu e derivate:
        
        ```
        sudo apt-get update
        sudo apt-get install nodejs npm
        
        ```
        
        Successivamente, verificare l'installazione eseguendo i seguenti comandi:
        
        ```
        node -v
        npm -v
        
        ```
        
- Installare Hyperledger Fabric:
1. Clona la repository fabric-sample nella directory che preferisci. Cambia il branch git in v2.1.0-hlf per utilizzare i sample oggetto della guida

```bash

git clone https://github.com/Gianlu01k/fabric-samples.git

cd fabric-samples

git checkout v2.1.0-hlf
```

2. Scarica le immagini di Docker per Hyperledger Fabric e i file binari. Assicurati di sostituire **`<versione>`** con la versione specifica di Hyperledger Fabric che desideri scaricare:

```

curl -sSL https://bit.ly/2ysbOFE | bash -s -- <versione>

# Per questa guida è stato utilizzato:
# curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.1.1 1.4.7 0.4.20
```

## Creare la rete

1. Posizionarsi nella directory 
    
    ```bash
    cd tracecoop-net
    ```
    
2. Eseguire lo script `byfn.sh` (Build Your First Network) nel seguente formato indicando il numero di Organizzazioni (per partire utilizzeremo una organizzazione master) e indicando il numero di orderers (<numero_orderers>)
    
    ```bash
    ./byfn.sh up -o 0 -r <numero_orderers> 
    
    ```
    

La prima organizzazione Org0 è stata creata. Da questa dipende un peer0 e il relativo container Docker all’indirizzo localhost:7051. Peer0 è di default un peer Admin che permetterà le operazioni di endorsement di nuove Orgs, chaincodes, ecc. Inoltre sono stati creati gli ordinatori e un canale ‘mychannel’ a cui il peer0 e gli ordinatori partecipano. 

### Flags

- -o <numero_orgs> numero di organizzazioni da creare all’inizio della rete. (0 di default)
- -r <numero_ords> numero di orderers da creare all’inizio della rete. (1 di default)
- -c <nome_canale> specifica il nome del canale a cui parteciperanno i peer inizialmente creati (di default ‘mychannel’)
- -a <true> crea una Certification Authority utile per dispensare certificati alle organizzazioni (1 di default)
- -z <dominio> specifica il dominio con cui verranno create le prime organizzazioni (di default ‘master’). es. peer0.org0master.com
- Altri. Puoi trovare gli altri flag disponibili nella documentazione di Hyperledger Fabric

 

```bash
./byfn.sh up -o <numero_orgs> -r <numero_ords> -c <nome_canale> -a true -z <dominio>

```

## Aggiungere altre organizzazioni

1. Posizionarsi nella directory 
    
    ```bash
    cd fabric-sample/tracecoop-net
    ```
    
2. Eseguire lo script `eyfn.sh` (Edit Your First Network) per l’aggiunta dell'organizzazione
    
    ```bash
    ./eyfn.sh up <dominio>
    
    ```
    

Con questo comando possiamo creare e aggiungere un’organizzazione con un peer0 e il relativo container Docker

### Chaincode

In contemporanea alla creazione della rete con [byfn.sh](http://byfn.sh) e all’aggiunta delle organizzazioni con eyfn.sh, viene installato sui peer il chaincode fabprod. Inizialmente viene inizializzato e potrà essere modificato mediante richieste di transazioni dall’applicazione.

### Applicazione

Le API messe a disposizione da Hyperledger Fabric consentono di inviare proposte di transazioni al peer a cui ci si collega. 

Posizionarsi nella directory dell’applicazione

```bash
cd /fabric-samples/fabprod
```

Avviare la rete e di default aggiungere una organizzazione

```bash
./startFabric.sh
```

Questo serve ad avviare la rete con l’organizzazione 0 master (e il relativo peer0) con la CA CA0 e successivamente aggiunge l’organizzazione 1 slave0 (con il relativo peer0)

Adesso la rete è attiva. Possiamo procedere ad indentificare l’utente

Andiamo nella directory relativa al backend javascript ed eseguiamo due script 

```bash
cd /javascript

#node install, la prima volta che viene utilizzato per installare tutti i moduli necessari

node enrollAdmin.js
node registerUser.js
```

Con enrollAdmin.js e registerUser.js viene creata l’identità dell’admin e del relativo utente che si sta autenticando

Il risultato degli ultimi due comandi è:

```bash
#enrollAdmin
Wallet path: /home/gianluigi/tesi/real/fabric-samples/fabprod/javascript/wallet
Successfully enrolled admin user admin1 and imported it into the wallet
```

```bash
#registerUser
Wallet path: /home/gianluigi/tesi/real/fabric-samples/fabprod/javascript/wallet
Successfully registered and enrolled admin useraddUser1and imported it into the wallet
```

Copiare la directory wallet presente in fabprod/javascript nella directory fabprod/javascript/apiserver

Ora ci si sposta nella directory del server Express e si avvia il server

```bash
cd apiserver
#node install, la prima volta che viene utilizzato per installare tutti i moduli necessari

node apiserver.js
```

Si otterrà 

```bash
Connesso al server 
#è stata avviata il server con la porta specificata nel file
```

Adesso il server Express è attivo e in ascolto sulla porta designata

Da questo momento è possibile effettuare delle richieste HTTP agli endpoint delle API descritte in seguito

## License <a name="license"></a>

Hyperledger Project source code files are made available under the Apache
License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
Hyperledger Project documentation files are made available under the Creative
Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
