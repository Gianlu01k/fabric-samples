var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
console.log('Connesso al server')

// Setting for Hyperledger Fabric
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// fs.cp('/../', './dest/info.txt', (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });

const org=1
const admin_name='admin'+org
const app_user='addUser'+org
const connection='connection-org'+org+'.json'

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'first-network', connection);
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

let key=0

app.get('/api/queryallprods', async function (req, res) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(app_user);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: app_user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabprod');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('queryAllProducts');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});


app.get('/api/query/:prod_index', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(app_user);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: app_user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabprod');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryProduct', req.params.prod_index);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/addproduct/', async function (req, res) {
    try {

    
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(app_user);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: app_user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabprod');
        console.log(req.body)
        // Submit the specified transaction.
        await contract.submitTransaction('createProd', key, JSON.stringify(req.body));
        console.log('Transaction has been submitted');
        key++
        res.send('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

  app.post('/api/editproduct/:key/:section', async function (req, res) {
      try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(app_user);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: app_user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabprod');
          // Submit the specified transaction.
          obj = {prodNumber : req.params.key, data: req.body, section:req.params.section}
          console.log(obj)
          await contract.submitTransaction('editProduct', obj);
          console.log('Transaction has been submitted');
          res.send('Transaction has been submitted');

          // Disconnect from the gateway.
          await gateway.disconnect();
      } catch (error) {
          console.error(`Failed to submit transaction: ${error}`);
          process.exit(1);
      }	
  })

app.listen(4004);