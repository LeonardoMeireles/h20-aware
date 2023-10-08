const cheerio = require('cheerio');

const convertToBase64 = (value) => {
    return Buffer.from(value).toString('base64');
}

const formatDate = (date) => {
    return date.toISOString().slice(0, -5) + 'Z';;
}

const subDays = (date, value) => {
    const twoDaysAgo = new Date(date);
    twoDaysAgo.setDate(date.getDate() - value);

    return twoDaysAgo;
}

const removeCSVPartFromHTML = (html, title) => {
    const $ = cheerio.load(html);

    $('h3').remove();

    const csvElement = $('#csv');
    csvElement.attr('style', 'display: none;');

    $('title').text(title);

    const modifiedHTML = $.html();

    return modifiedHTML;
}

module.exports = {
    convertToBase64,
    formatDate,
    subDays,
    removeCSVPartFromHTML
}