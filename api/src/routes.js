const express = require('express');

const { getPrecipitation, getEvaporation } = require('./mateomatics.service');

const routes = express();

routes.get('/precipitation/lat/:lat/long/:long', async (req, res) => {
    const { lat, long } = req.params;

    const result = await getPrecipitation(lat, long);

    return res.status(200).send(result)
})

routes.get('/evaporation/lat/:lat/long/:long', async (req, res) => {
    const { lat, long } = req.params;

    const result = await getEvaporation(lat, long);

    return res.status(200).send(result)
})

module.exports = routes