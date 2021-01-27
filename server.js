const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
require('dotenv').config();

const apiKey = process.env.API_KEY;

let coins = []; 
let fifteenMin = 900000;

setInterval(() => {
    fetchCoins();
}, fifteenMin);

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

async function fetchCoins() {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`);
    coins = response.data.data;
}

app.get('/api/coins', (request, response) => {
    try {
        response.json(coins);
    } catch (error) {
        console.log(error.message);
    }
});

fetchCoins();

app.listen(3000, () => console.log('Listening on 3000 Port'))

