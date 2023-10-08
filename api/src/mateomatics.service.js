const axios = require('axios');

const { convertToBase64, formatDate, subDays, removeCSVPartFromHTML } = require('./utils');

const mateomaticsApi = axios.create({ baseURL: process.env.MATEOMATICS_API_URL_BASE });

const FORMAT = {
    HTML: 'html',
    HTML_MAP: 'html_map',
    PNG: 'png',
    CSV: 'csv',
    XML: 'xml',
    JSON: 'json',
}

/**
 * Get token from Mateomatics API
 * 
 * @returns string
 */
const getToken = async () => {
    const usernamePassword = process.env.MATEOMATICS_API_USER + ':' + process.env.MATEOMATICS_API_PASSWORD;
    const usernamePasswordBase64 = convertToBase64(usernamePassword);

    const { data } = await axios.get(process.env.MATEOMATICS_LOGIN_URL, {
        headers: {
            'Authorization': 'Basic ' + usernamePasswordBase64
        }
    })

    return data.access_token;
}


const mountQuery = async (query) => {
    const accessToken = await getToken();

    return query + '?access_token=' + accessToken;
}

const getPrecipitation = async (lat, long, daysBehind = 2, precipInterval = 5) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);
    const startDate = subDays(today, daysBehind);
    const startDateFormatted = formatDate(startDate);

    const datePart = `${startDateFormatted}--${endDateFormatted}`;
    const precipPart = `:PT${precipInterval}M/precip_${precipInterval}min:mm/`;
    const coordinatesPart = `${lat},${long}/`;
    const formatPart = FORMAT.HTML;

    const combinedParts = datePart + precipPart + coordinatesPart + formatPart;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const html = removeCSVPartFromHTML(data, 'Precipitation');

    return html;
}

// Negative values indicate evaporation, while positive values indicate condensation.
const getEvaporation = async (lat, long, daysBehind = 2, evaporationInterval = 1) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);

    const datePart = `${endDateFormatted}`;
    const evaporationPart = `P${daysBehind}D:PT${evaporationInterval}H/evaporation_${evaporationInterval}h:mm/`;
    const coordinatesPart = `${lat},${long}/`;
    const formatPart = FORMAT.HTML;

    const combinedParts = datePart + evaporationPart + coordinatesPart + formatPart;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const html = removeCSVPartFromHTML(data, 'Evaporation');

    return html;
}

// Negative values indicate evaporation, while positive values indicate condensation.
const getClouds = async (lat, long, daysBehind = 2, evaporationInterval = 1) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);

    const datePart = `${endDateFormatted}`;
    const evaporationPart = `P${daysBehind}D:PT${evaporationInterval}H/evaporation_${evaporationInterval}h:mm/`;
    const coordinatesPart = `${lat},${long}/`;
    const formatPart = FORMAT.HTML;

    const combinedParts = datePart + evaporationPart + coordinatesPart + formatPart;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const html = removeCSVPartFromHTML(data);

    return html;
}

module.exports = {
    getPrecipitation,
    getEvaporation
}