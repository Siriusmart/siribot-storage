const get = require('./get');
const fs = require('fs');

let cooldowns;

function getCooldown(userID, { commandName, buttonName, type, run, storagePath, botPath, guildID }) {
    let profile = get(userID, true, storagePath);
    let updateFile = false;
    const now = Date.now();

    if (cooldowns === undefined) {
        cooldowns = require(`../../${botPath}/functions/utilities/getConfigs`);
    }



    let server;
    if (guildID === null) {
        server = guildID;
    } else {
        server = 'dm';
    }

    switch (type) {
        case 'command':
            if (cooldowns.master.commands[commandName] === undefined) { return -1; }
            let serverCooldown = (cooldowns[server] === undefined) ? cooldowns.master.commands[commandName].cooldown : cooldowns[guildID].commands[commandName].cooldown;

            if (profile.cooldowns[commandName] === undefined) {
                profile.cooldowns[commandName] = { commandExecute: 0 };
                updateFile = true;
            }
            const cooldown = profile.cooldowns[commandName].commandExecute + serverCooldown - now;
            if (cooldown <= 0) {
                profile.cooldowns[commandName].commandExecute = now;
                updateFile = true;
            }

            if (updateFile && run) {
                fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(profile, null, 4));
            }
            return { cooldown, serverCooldown };

    }

}

module.exports = getCooldown;