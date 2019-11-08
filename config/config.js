const config = require ('config');

module.exports = function () {
    console.log('Verifying environmental variables');
    if (!config.get('orgUrl')) {
        throw new Error('FATAL ERROR: orgUrl not defined');
    }
    if (!config.get('clientId')) {
        throw new Error('FATAL ERROR: clientId not defined');
    }
    if (!config.get('clientSecret')) {
        throw new Error('FATAL ERROR: clientSecret not defined');
    }
    if (!config.get('hostUrl')) {
        throw new Error('FATAL ERROR: hostUrl not defined');
    }
    if (!config.get('randomSecret')) {
        throw new Error('FATAL ERROR: randomSecret not defined');
    }
    if (!config.get('apiToken')) {
        throw new Error('FATAL ERROR: apiToken not defined');
    }
    console.log('Environmental variables verified');
}