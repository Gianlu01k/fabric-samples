var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const org=1
const admin_name='admin'+org
const app_user='addUser'+org
const connection='connection-org'+org+'.json'

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'tracecoop-net', connection);
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

let key=0

app.get('/api', (req, res)=>{
    let par = Object.keys(req.query)
    if(par[0]==='all'){
        res.redirect('/queryallprods')
    }else{
        if(!isNaN(par[0])){
            let key='PROD'+par[0]
            res.redirect('/query/'+key)
        }else{
            res.sendStatus(404)
        }
    }
})

app.post('/api', (req,res)=>{
    let par = Object.keys(req.query)
    if(!isNaN(par[0])){
        let key='PROD'+par[0]
        const body = req.body;
        let encoded = encodeURIComponent(JSON.stringify(body))
        res.redirect('/editproduct/'+encoded+'/'+key)
    }else{
        if(par[0]==='new')
        {const body = req.body;
            let encoded = encodeURIComponent(JSON.stringify(body))
        res.redirect('/addproduct/'+encoded)
    }else{res.sendStatus(400)}}
}
)




app.get('/queryallprods', async function (req, res) {
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


app.get('/query/:prod_index', async function (req, res) {
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
        res.status(404).json({error: "Prodotto inesistente"});
    }
});

app.get('/addproduct/:body', async function (req, res) {
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
        const decoded=JSON.parse(decodeURIComponent(req.params.body))
        await contract.submitTransaction('createProd', 'PROD0', JSON.stringify(decoded));
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

app.get('/editproduct/:body/:key', async function (req, res) {
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
        const decoded=JSON.parse(decodeURIComponent(req.params.body))
        console.log(decoded)
        await contract.submitTransaction('editProduct', 'PROD0', JSON.stringify(decoded));
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.listen(4001),console.log('Connesso al server');
