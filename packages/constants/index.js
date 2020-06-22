const typeCodes = require('./lib/type-codes');
const clientCodes = require('./lib/client-codes');
function getTransactionType(){
    return typeCodes;
}
function getClientCode(){
    return clientCodes;
}
module.exports = {
    getTransactionType,
    getClientCode
};