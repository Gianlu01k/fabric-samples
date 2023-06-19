[//]: # (SPDX-License-Identifier: CC-BY-4.0)

## Hyperledger Fabric Samples

To execute the first network:

```bash

#git checkout v2.1.0-hlf

cd first-network

./byfn.sh down #to remove previous containers from docker

./byfn.sh up <n_Orgs_to_create> <n_Orderers_to_create>

#(ex: ./byfn.sh 3 5 would create 3 organization (with 2 peers for each one) and 5 orderers)

```

Peers number is fixed at 2. The first peer is the admin and anchor peer.

## Prerequisites

Please visit the [installation instructions](http://hyperledger-fabric.readthedocs.io/en/latest/install.html)
to ensure you have the correct prerequisites installed. Please use the
version of the documentation that matches the version of the software you
intend to use to ensure alignment.

## Download Binaries and Docker Images

The installation instructions will utilize `scripts/bootstrap.sh` (available in the fabric repository)
script to download all of the requisite Hyperledger Fabric binaries and docker
images, and tag the images with the 'latest' tag. Optionally,
specify a version for fabric, fabric-ca and thirdparty images. If versions
are not passed, the latest available versions will be downloaded.

The script will also clone fabric-samples repository using the version tag that
is aligned with the Fabric version.

You can also download the script and execute locally:

```bash
# Fetch bootstrap.sh from fabric repository using
curl -sS https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh -o ./scripts/bootstrap.sh
# Change file mode to executable
chmod +x ./scripts/bootstrap.sh
# Download binaries and docker images
./scripts/bootstrap.sh [version] [ca version] [thirdparty_version]
```

## License <a name="license"></a>

Hyperledger Project source code files are made available under the Apache
License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
Hyperledger Project documentation files are made available under the Creative
Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
