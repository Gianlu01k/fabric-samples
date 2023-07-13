/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabProd extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [];

        for (let i = 0; i < products.length; i++) {
            products[i].docType = 'product';
            await ctx.stub.putState('PROD' + i, Buffer.from(JSON.stringify(products[i])));
            console.info('Added <--> ', products[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryProduct(ctx, prodNumber) {
        const prodAsBytes = await ctx.stub.getState(prodNumber); // get the car from chaincode state
        if (!prodAsBytes || prodAsBytes.length === 0) {
            throw new Error(`${prodNumber} does not exist`);
        }
        console.log(prodAsBytes.toString());
        return prodAsBytes.toString();
    }

    async createProd(ctx, prodNumber, prod) {
        console.info('============= START : Create Product ===========');

        const product = {prod}

        await ctx.stub.putState(prodNumber, Buffer.from(JSON.stringify(product)));
        console.info('============= END : Create Product ===========');
    }

    async queryAllProducts(ctx) {
        const startKey = 'PROD0';
        const endKey = 'PROD999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async editProduct(ctx, prodNumber, prod) {
        console.info('============= START : Edit Product ===========');

        const product = {prod}

        await ctx.stub.putState(prodNumber, Buffer.from(JSON.stringify(product)));
        console.info('============= END : Edit Product ===========');

}

}

module.exports = FabProd;
