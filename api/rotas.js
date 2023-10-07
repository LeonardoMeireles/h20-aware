const express = require('express');

const rotas = express();

const data = require('./data.json');


rotas.get('/', (req, res) => {
    return res.status(200).json({ data })
})

module.exports = rotas