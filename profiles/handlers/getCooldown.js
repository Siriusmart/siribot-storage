const get = require('./get');

function getCooldown(userID, {commandName, buttonName, type, run, storagePath}){
    var profile = get(userID, true, storagePath);
    
}

module.exports = getCooldown;