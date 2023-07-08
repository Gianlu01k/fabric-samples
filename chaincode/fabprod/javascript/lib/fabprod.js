/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabProd extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [
          {
            "id":"asparago1",
            "CUAA": "03410640712",
                "Partita IVA": "03410640712",
                "Denominazione": "DEL PRETE MASSIMO AZ. AGRICOLA",
                "Forma Giuridica": "Ditta individuale",
                "Titolare o Rappresentante legale": "Del Prete Massimo  ",
                "Attività agricola (codice e descrizione)": "01-13-10",
                "ID lotto (progr.)": "1",
                "Comune": "FOGGIA",
                "Sez.": "",
                "Fog.": "183",
                "Part.": "249-261-260-844-54-251",
                "Forma di conduzione": "PROPRIETA'",
                "Superficie totale (ha)": "8,84",
            "Operazioni colturali":
                [
                  {
                    "N. progr. Operazione": "1",
                    "Data": "22/02/2021",
                    "ID lotto": "1",
                    "Nome operazione": "FRESATURA",
                    "Tipo (manuale/meccanica)": "MECCANICA",
                    "Durata (h)": "2 h/Ha"
                  },
                  {
                    "N. progr. Operazione": "2",
                    "Data": "14/03/2021",
                    "ID lotto": "1",
                    "Nome operazione": "FRESATURA",
                    "Tipo (manuale/meccanica)": "MECCANICA",
                    "Durata (h)": "2 h/Ha"
                  }
                ],
                "Operazioni irrigazione":[
                {
                  "N. progr. Irrigazione": "1",
                  "Data": "15/04/2021",
                  "ID lotto": "1",
                  "Durata (h)": "12",
                  "Volume (mc)": "200"
                },
                {
                  "N. progr. Irrigazione": "2",
                  "Data": "01/05/2021",
                  "ID lotto": "1",
                  "Durata (h)": "12",
                  "Volume (mc)": "200"
                }
              ],
          "Operazioni concimazione":[
            {
                "N. progr. Applicazione": "1",
                "Data": "04/03/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "CONCIMAZIONE",
                "Nome prodotto": "Perfosfato Triplo",
                "Quantità somministrata (dose/ha)": "250 kg/Ha"
            },
            {
                "N. progr. Applicazione": "2",
                "Data": "04/03/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "CONCIMAZIONE",
                "Nome prodotto": "Ortofrutta 12-12-17",
                "Quantità somministrata (dose/ha)": "170 kg/Ha"
            }
        ],
          "Operazioni produzione": [
            {
                "N. Progr. Raccolto": "1",
                "ID lotto": "1",
                "Classificazione Merce": "15/03/2021",
                "U.M.": "",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            }
        ]
            }
        ];

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

    async createProduct(ctx) {
        console.info('============= START : Create Product ===========');

        const product = {
          "id":"asparago2",
          "CUAA": "03410640712",
              "Partita IVA": "03410640712",
              "Denominazione": "DEL PRETE MASSIMO AZ. AGRICOLA",
              "Forma Giuridica": "Ditta individuale",
              "Titolare o Rappresentante legale": "Del Prete Massimo  ",
              "Attività agricola (codice e descrizione)": "01-13-10",
              "ID lotto (progr.)": "1",
              "Comune": "CERIGNOLA",
              "Sez.": "",
              "Fog.": "183",
              "Part.": "249-261-260-844-54-251",
              "Forma di conduzione": "PROPRIETA'",
              "Superficie totale (ha)": "8,84",
          "Operazioni colturali":
              [
                {
                  "N. progr. Operazione": "1",
                  "Data": "22/02/2021",
                  "ID lotto": "1",
                  "Nome operazione": "FRESATURA",
                  "Tipo (manuale/meccanica)": "MECCANICA",
                  "Durata (h)": "2 h/Ha"
                },
                {
                  "N. progr. Operazione": "2",
                  "Data": "14/03/2021",
                  "ID lotto": "1",
                  "Nome operazione": "FRESATURA",
                  "Tipo (manuale/meccanica)": "MECCANICA",
                  "Durata (h)": "2 h/Ha"
                }
              ],
              "Operazioni irrigazione":[
              {
                "N. progr. Irrigazione": "1",
                "Data": "15/04/2021",
                "ID lotto": "1",
                "Durata (h)": "12",
                "Volume (mc)": "200"
              },
              {
                "N. progr. Irrigazione": "2",
                "Data": "01/05/2021",
                "ID lotto": "1",
                "Durata (h)": "12",
                "Volume (mc)": "200"
              }
            ],
        "Operazioni concimazione":[
          {
              "N. progr. Applicazione": "1",
              "Data": "04/03/2021",
              "ID lotto": "1",
              "Tipo applicazione (concimazione/trattamento)": "CONCIMAZIONE",
              "Nome prodotto": "Perfosfato Triplo",
              "Quantità somministrata (dose/ha)": "250 kg/Ha"
          },
          {
              "N. progr. Applicazione": "2",
              "Data": "04/03/2021",
              "ID lotto": "1",
              "Tipo applicazione (concimazione/trattamento)": "CONCIMAZIONE",
              "Nome prodotto": "Ortofrutta 12-12-17",
              "Quantità somministrata (dose/ha)": "170 kg/Ha"
          }
      ],
        "Operazioni produzione": [
          {
              "N. Progr. Raccolto": "1",
              "ID lotto": "1",
              "Classificazione Merce": "15/03/2021",
              "U.M.": "",
              "Quantità": "12,00 ",
              "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
          },
          {
              "N. Progr. Raccolto": "",
              "ID lotto": "1",
              "Classificazione Merce": "ASPARAGO VERDE I°",
              "U.M.": "KG",
              "Quantità": "10,00 ",
              "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Capannone"
          }
      ]
          }

        await ctx.stub.putState(prodNumber, Buffer.from(JSON.stringify(product)));
        console.info('============= END : Create Car ===========');
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

    async changepProductOwner(ctx, prodNumber, newOwner) {
        console.info('============= START : changeProductOwner ===========');

        const prodAsBytes = await ctx.stub.getState(prodNumber); // get the car from chaincode state
        if (!prodAsBytes || prodAsBytes.length === 0) {
            throw new Error(`${prodNumber} does not exist`);
        }
        const product = JSON.parse(prodAsBytes.toString());
        product.owner = newOwner;

        await ctx.stub.putState(prodNumber, Buffer.from(JSON.stringify(product)));
        console.info('============= END : changeProductOwner ===========');
    }

}

module.exports = FabProd;
