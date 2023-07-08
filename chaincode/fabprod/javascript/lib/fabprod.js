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
                  },
                  {
                    "N. progr. Operazione": "3",
                    "Data": "19/05/2021",
                    "ID lotto": "1",
                    "Nome operazione": "TRINCIATURA",
                    "Tipo (manuale/meccanica)": "MECCANICA",
                    "Durata (h)": "2 h/Ha"
                  },
                  {
                    "N. progr. Operazione": "4",
                    "Data": "dal 15/3/21 al 16/6/21",
                    "ID lotto": "1",
                    "Nome operazione": "RACCOLTA",
                    "Tipo (manuale/meccanica)": "MANUALE/AGEVOLATA",
                    "Durata (h)": "5 h/Ha"
                  },
                  {
                    "N. progr. Operazione": "5",
                    "Data": "02/07/2021",
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
                },
                {
                  "N. progr. Irrigazione": "3",
                  "Data": "10/05/2021",
                  "ID lotto": "1",
                  "Durata (h)": "12",
                  "Volume (mc)": "200"
                },
                {
                  "N. progr. Irrigazione": "4",
                  "Data": "30/05/2021",
                  "ID lotto": "1",
                  "Durata (h)": "12",
                  "Volume (mc)": "200"
                },
                {
                  "N. progr. Irrigazione": "5",
                  "Data": "10/06/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "6",
                  "Data": "20/06/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "7",
                  "Data": "30/06/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "8",
                  "Data": "02/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "9",
                  "Data": "09/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "10",
                  "Data": "31/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "11",
                  "Data": "14/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "12",
                  "Data": "21/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "13",
                  "Data": "26/07/2021",
                  "ID lotto": "1",
                  "Durata (h)": "15",
                  "Volume (mc)": "250"
                },
                {
                  "N. progr. Irrigazione": "14",
                  "Data": "04/08/2021",
                  "ID lotto": "1",
                  "Durata (h)": "12",
                  "Volume (mc)": "200"
                },
                {
                  "N. progr. Irrigazione": "15",
                  "Data": "25/08/2021",
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
            },
            {
                "N. progr. Applicazione": "3",
                "Data": "02/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "TRATTAMENTO",
                "Nome prodotto": "Sencor 600 SC",
                "Quantità somministrata (dose/ha)": "0,7 Lt/Ha"
            },
            {
                "N. progr. Applicazione": "4",
                "Data": "02/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Solfato Ammonico",
                "Quantità somministrata (dose/ha)": "15 kg/Ha"
            },
            {
                "N. progr. Applicazione": "5",
                "Data": "09/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Siapton",
                "Quantità somministrata (dose/ha)": "3 kg/Ha"
            },
            {
                "N. progr. Applicazione": "6",
                "Data": "14/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Mycoapply",
                "Quantità somministrata (dose/ha)": "0,85 lt/Ha"
            },
            {
                "N. progr. Applicazione": "7",
                "Data": "21/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Urea",
                "Quantità somministrata (dose/ha)": "6 kg/Ha"
            },
            {
                "N. progr. Applicazione": "8",
                "Data": "26/07/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Extran 33,5",
                "Quantità somministrata (dose/ha)": "20 kg/Ha"
            },
            {
                "N. progr. Applicazione": "9",
                "Data": "04/08/2021",
                "ID lotto": "1",
                "Tipo applicazione (concimazione/trattamento)": "FERTIRRIGAZIONE",
                "Nome prodotto": "Agrozin 9L",
                "Quantità somministrata (dose/ha)": "0,8 Lt/Ha"
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
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "2",
                "ID lotto": "1",
                "Classificazione Merce": "18/03/2021",
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
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "3",
                "ID lotto": "1",
                "Classificazione Merce": "29/03/2021",
                "U.M.": "",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "1,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "4",
                "ID lotto": "1",
                "Classificazione Merce": "01/04/2021",
                "U.M.": "",
                "Quantità": "139,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "93,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "33,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "5",
                "ID lotto": "1",
                "Classificazione Merce": "03/04/2021",
                "U.M.": "",
                "Quantità": "167,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "109,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "2,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "43,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "6",
                "ID lotto": "1",
                "Classificazione Merce": "05/04/2021",
                "U.M.": "",
                "Quantità": "124,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "85,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "7",
                "ID lotto": "1",
                "Classificazione Merce": "08/04/2021",
                "U.M.": "",
                "Quantità": "206,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "154,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "8",
                "ID lotto": "1",
                "Classificazione Merce": "11/04/2021",
                "U.M.": "",
                "Quantità": "373,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "269,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "64,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "9",
                "ID lotto": "1",
                "Classificazione Merce": "13/04/2021",
                "U.M.": "",
                "Quantità": "335,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "255,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "47,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "10",
                "ID lotto": "1",
                "Classificazione Merce": "15/04/2021",
                "U.M.": "",
                "Quantità": "197,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "156,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "11",
                "ID lotto": "1",
                "Classificazione Merce": "17/04/2021",
                "U.M.": "",
                "Quantità": "259,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "199,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "28,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "12",
                "ID lotto": "1",
                "Classificazione Merce": "20/04/2021",
                "U.M.": "",
                "Quantità": "478,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "333,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "23,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "88,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "23,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "13",
                "ID lotto": "1",
                "Classificazione Merce": "22/04/2021",
                "U.M.": "",
                "Quantità": "59,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "41,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "2,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "14",
                "ID lotto": "1",
                "Classificazione Merce": "24/04/2021",
                "U.M.": "",
                "Quantità": "917,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "692,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "30,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "29,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "136,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "30,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "15",
                "ID lotto": "1",
                "Classificazione Merce": "26/04/2021",
                "U.M.": "",
                "Quantità": "703,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "508,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "28,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "25,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "113,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "29,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "16",
                "ID lotto": "1",
                "Classificazione Merce": "27/04/2021",
                "U.M.": "",
                "Quantità": "442,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "298,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "96,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "17",
                "ID lotto": "1",
                "Classificazione Merce": "28/04/2021",
                "U.M.": "",
                "Quantità": "500,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "352,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "83,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "18",
                "ID lotto": "1",
                "Classificazione Merce": "29/04/2021",
                "U.M.": "",
                "Quantità": "609,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "412,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "28,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "23,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "118,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "28,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "19",
                "ID lotto": "1",
                "Classificazione Merce": "30/04/2021",
                "U.M.": "",
                "Quantità": "500,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "337,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "119,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "19,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "20",
                "ID lotto": "1",
                "Classificazione Merce": "01/05/2021",
                "U.M.": "",
                "Quantità": "536,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "353,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "20,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "16,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "127,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "20,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "21",
                "ID lotto": "1",
                "Classificazione Merce": "02/05/2021",
                "U.M.": "",
                "Quantità": "642,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "433,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "149,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "22",
                "ID lotto": "1",
                "Classificazione Merce": "03/05/2021",
                "U.M.": "",
                "Quantità": "311,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "228,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "40,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "23",
                "ID lotto": "1",
                "Classificazione Merce": "04/05/2021",
                "U.M.": "",
                "Quantità": "311,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "217,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "61,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "24",
                "ID lotto": "1",
                "Classificazione Merce": "05/05/2021",
                "U.M.": "",
                "Quantità": "400,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "273,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "87,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "25",
                "ID lotto": "1",
                "Classificazione Merce": "06/05/2021",
                "U.M.": "",
                "Quantità": "394,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "261,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "88,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "26",
                "ID lotto": "1",
                "Classificazione Merce": "07/05/2021",
                "U.M.": "",
                "Quantità": "309,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "217,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "58,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "27",
                "ID lotto": "1",
                "Classificazione Merce": "08/05/2021",
                "U.M.": "",
                "Quantità": "462,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "294,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "16,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "120,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "17,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "28",
                "ID lotto": "1",
                "Classificazione Merce": "09/05/2021",
                "U.M.": "",
                "Quantità": "252,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "161,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "58,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "29",
                "ID lotto": "1",
                "Classificazione Merce": "10/05/2021",
                "U.M.": "",
                "Quantità": "220,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "139,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "53,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "30",
                "ID lotto": "1",
                "Classificazione Merce": "11/05/2021",
                "U.M.": "",
                "Quantità": "297,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "193,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "66,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "31",
                "ID lotto": "1",
                "Classificazione Merce": "12/05/2021",
                "U.M.": "",
                "Quantità": "351,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "219,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "91,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "15,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "32",
                "ID lotto": "1",
                "Classificazione Merce": "13/05/2021",
                "U.M.": "",
                "Quantità": "267,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "182,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "52,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "33",
                "ID lotto": "1",
                "Classificazione Merce": "14/05/2021",
                "U.M.": "",
                "Quantità": "305,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "191,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "76,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "34",
                "ID lotto": "1",
                "Classificazione Merce": "15/05/2021",
                "U.M.": "",
                "Quantità": "304,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "186,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "83,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "35",
                "ID lotto": "1",
                "Classificazione Merce": "16/05/2021",
                "U.M.": "",
                "Quantità": "210,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "133,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "47,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "36",
                "ID lotto": "1",
                "Classificazione Merce": "17/05/2021",
                "U.M.": "",
                "Quantità": "225,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "151,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "41,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "37",
                "ID lotto": "1",
                "Classificazione Merce": "18/05/2021",
                "U.M.": "",
                "Quantità": "281,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "166,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "19,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "71,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "38",
                "ID lotto": "1",
                "Classificazione Merce": "19/05/2021",
                "U.M.": "",
                "Quantità": "151,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "68,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "61,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "39",
                "ID lotto": "1",
                "Classificazione Merce": "20/05/2021",
                "U.M.": "",
                "Quantità": "137,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "79,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "33,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "40",
                "ID lotto": "1",
                "Classificazione Merce": "21/05/2021",
                "U.M.": "",
                "Quantità": "155,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "92,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "16,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "33,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "41",
                "ID lotto": "1",
                "Classificazione Merce": "22/05/2021",
                "U.M.": "",
                "Quantità": "221,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "107,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "85,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "42",
                "ID lotto": "1",
                "Classificazione Merce": "23/05/2021",
                "U.M.": "",
                "Quantità": "228,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "113,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "88,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "43",
                "ID lotto": "1",
                "Classificazione Merce": "24/05/2021",
                "U.M.": "",
                "Quantità": "221,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "102,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "92,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "44",
                "ID lotto": "1",
                "Classificazione Merce": "25/05/2021",
                "U.M.": "",
                "Quantità": "285,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "116,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "143,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "45",
                "ID lotto": "1",
                "Classificazione Merce": "26/05/2021",
                "U.M.": "",
                "Quantità": "205,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "100,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "80,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "46",
                "ID lotto": "1",
                "Classificazione Merce": "27/05/2021",
                "U.M.": "",
                "Quantità": "120,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "67,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "36,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "47",
                "ID lotto": "1",
                "Classificazione Merce": "28/05/2021",
                "U.M.": "",
                "Quantità": "229,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "95,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "111,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "48",
                "ID lotto": "1",
                "Classificazione Merce": "29/05/2021",
                "U.M.": "",
                "Quantità": "218,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "115,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "75,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "49",
                "ID lotto": "1",
                "Classificazione Merce": "30/05/2021",
                "U.M.": "",
                "Quantità": "75,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "49,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "13,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "50",
                "ID lotto": "1",
                "Classificazione Merce": "31/05/2021",
                "U.M.": "",
                "Quantità": "243,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "135,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "16,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "72,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "51",
                "ID lotto": "1",
                "Classificazione Merce": "01/06/2021",
                "U.M.": "",
                "Quantità": "187,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "103,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "11,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "58,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "52",
                "ID lotto": "1",
                "Classificazione Merce": "02/06/2021",
                "U.M.": "",
                "Quantità": "154,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "91,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "39,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "53",
                "ID lotto": "1",
                "Classificazione Merce": "03/06/2021",
                "U.M.": "",
                "Quantità": "143,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "77,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "48,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "54",
                "ID lotto": "1",
                "Classificazione Merce": "04/06/2021",
                "U.M.": "",
                "Quantità": "158,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "89,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "46,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "55",
                "ID lotto": "1",
                "Classificazione Merce": "05/06/2021",
                "U.M.": "",
                "Quantità": "129,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "77,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "32,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "6,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "56",
                "ID lotto": "1",
                "Classificazione Merce": "06/06/2021",
                "U.M.": "",
                "Quantità": "165,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "113,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "8,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "28,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "9,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "57",
                "ID lotto": "1",
                "Classificazione Merce": "07/06/2021",
                "U.M.": "",
                "Quantità": "117,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "65,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "39,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "58",
                "ID lotto": "1",
                "Classificazione Merce": "08/06/2021",
                "U.M.": "",
                "Quantità": "99,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "50,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "36,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "59",
                "ID lotto": "1",
                "Classificazione Merce": "09/06/2021",
                "U.M.": "",
                "Quantità": "80,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "48,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "19,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "60",
                "ID lotto": "1",
                "Classificazione Merce": "10/06/2021",
                "U.M.": "",
                "Quantità": "75,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "52,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "12,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "61",
                "ID lotto": "1",
                "Classificazione Merce": "11/06/2021",
                "U.M.": "",
                "Quantità": "75,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "40,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "62",
                "ID lotto": "1",
                "Classificazione Merce": "12/06/2021",
                "U.M.": "",
                "Quantità": "76,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "41,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "24,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "63",
                "ID lotto": "1",
                "Classificazione Merce": "13/06/2021",
                "U.M.": "",
                "Quantità": "59,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "36,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "5,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "10,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "4,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "64",
                "ID lotto": "1",
                "Classificazione Merce": "14/06/2021",
                "U.M.": "",
                "Quantità": "52,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "37,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "2,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "7,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "65",
                "ID lotto": "1",
                "Classificazione Merce": "15/06/2021",
                "U.M.": "",
                "Quantità": "59,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "32,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "18,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "66",
                "ID lotto": "1",
                "Classificazione Merce": "16/06/2021",
                "U.M.": "",
                "Quantità": "51,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE I°",
                "U.M.": "KG",
                "Quantità": "29,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE DECLASSIFICATO",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE CAT. 2° (GOBBO)",
                "U.M.": "KG",
                "Quantità": "3,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGINA VERDE SFUSA",
                "U.M.": "KG",
                "Quantità": "14,00 ",
                "Stoccaggio (azienda/centro di raccolta/centro lavorazione)": "Centro di raccolta"
            },
            {
                "N. Progr. Raccolto": "",
                "ID lotto": "1",
                "Classificazione Merce": "ASPARAGO VERDE SCARTO",
                "U.M.": "KG",
                "Quantità": "2,00 ",
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

    async createProduct(ctx, prod) {
        console.info('============= START : Create Product ===========');

        const product = {prod}

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
