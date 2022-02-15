const get = require('./get');
const fs = require('fs');

function getCooldown(userID, { commandName, buttonName, subcommandName, selectmenuName, type, run, storagePath, botPath, guildID, configs }) {

    let cooldown, serverCooldown, logger;
    try {
        let profile = get(userID, true, storagePath);
        let updateFile = false;
        const now = Date.now();

        if (logger === undefined) {
            logger = require(`../../${botPath}/functions/utilities/logger`);
        }

        switch (type) {
            case 'command':

                if (profile.cooldowns[commandName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName] = {
                            commandExecute: 0,
                            subcommands: {},
                            buttons: {},
                            selectmenus: {}
                        };
                    } else {
                        return { cooldown: -1 };
                    }
                }

                if (configs[guildID] === undefined || configs[guildID].commands === undefined || configs[guildID].commands[commandName] === undefined || configs[guildID].commands[commandName].cooldown === undefined) {
                    serverCooldown = configs.master.commands[commandName].cooldown;
                } else {
                    serverCooldown = configs[guildID].commands[commandName].cooldown;
                }

                if (serverCooldown === undefined) {
                    return { cooldown: -1 };
                }

                cooldown = serverCooldown + profile.cooldowns[commandName].commandExecute - now;

                if (run && cooldown <= 0) {
                    updateFile = true;
                    profile.cooldowns[commandName].commandExecute = now;
                }

                if (updateFile) {
                    fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(profile, null, 4));
                }
                return { cooldown, serverCooldown };

            case 'subcommand':
                if (profile.cooldowns[commandName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName] = {
                            commandExecute: 0,
                            subcommands: {},
                            buttons: {},
                            selectmenus: {}
                        };
                    } else {
                        return { cooldown: -1 };
                    }
                }

                if (profile.cooldowns[commandName].subcommands[subcommandName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName].subcommands[subcommandName] = { subcommandExecute: 0 };
                    } else {
                        return { cooldown: -1 };
                    }
                }


                if (configs[guildID] === undefined || configs[guildID].commands[commandName] === undefined || configs[guildID].commands[commandName].subcommands === undefined || configs[guildID].commands[commandName].subcommands[subcommandName] === undefined || configs[guildID].commands[commandName].subcommands[subcommandName].cooldown === undefined) {
                    guildID = 'master';
                }

                serverCooldown = configs[guildID].commands[commandName].subcommands[subcommandName].cooldown;

                if (serverCooldown === undefined) {
                    return { cooldown: -1 };
                }

                cooldown = serverCooldown + profile.cooldowns[commandName].subcommands[subcommandName].subcommandExecute - now;

                if (run && cooldown <= 0) {
                    updateFile = true;
                    profile.cooldowns[commandName].subcommands[subcommandName].subcommandExecute = now;
                }

                if (updateFile) {
                    fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(profile, null, 4));
                }

                return { cooldown, serverCooldown };

            case 'button':

                if (profile.cooldowns[commandName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName] = {
                            commandExecute: 0,
                            subcommands: {},
                            buttons: {},
                            selectmenus: {}
                        };
                    } else {
                        return { cooldown: -1 };
                    }
                }

                if (profile.cooldowns[commandName].buttons[buttonName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName].buttons[buttonName] = { buttonExecute: 0 };
                    } else {
                        return { cooldown: -1 };
                    }
                }

                if (configs[guildID] === undefined || configs[guildID].commands[commandName] === undefined || configs[guildID].commands[commandName].buttons[buttonName] === undefined || configs[guildID].commands[commandName].buttons[buttonName].cooldown === undefined) {
                    guildID = 'master';
                }

                serverCooldown = configs[guildID].commands[commandName].buttons[buttonName].cooldown;
                cooldown = serverCooldown + profile.cooldowns[commandName].buttons[buttonName].buttonExecute - now;

                if (run && cooldown <= 0) {
                    updateFile = true;
                    profile.cooldowns[commandName].buttons[buttonName].buttonExecute = now;
                }

                if (updateFile) {
                    fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(profile, null, 4));
                }

                return { cooldown, serverCooldown };

            case 'selectmenu':
                if (profile.cooldowns[commandName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName] = {
                            commandExecute: 0,
                            subcommands: {},
                            buttons: {},
                            selectmenus: {}
                        };
                    } else {
                        return { cooldown: -1 };
                    }
                }
                if (profile.cooldowns[commandName].selectmenus[selectmenuName] === undefined) {
                    if (run) {
                        updateFile = true;
                        profile.cooldowns[commandName].selectmenus[selectmenuName] = { selectmenuExecute: 0 };
                    } else {
                        return { cooldown: -1 };
                    }
                }

                if (configs[guildID] === undefined || configs[guildID].commands[commandName] === undefined || configs[guildID].commands[commandName].selectmenus === undefined || configs[guildID].commands[commandName].selectmenus[selectmenuName] === undefined || configs[guildID].commands[commandName].selectmenus[selectmenuName].cooldown === undefined) {
                    guildID = 'master';
                }

                serverCooldown = configs[guildID].commands[commandName].selectmenus[selectmenuName].cooldown;

                if (serverCooldown === undefined) {
                    return { cooldown: -1 };
                }

                cooldown = serverCooldown + profile.cooldowns[commandName].selectmenus[selectmenuName].selectmenuExecute - now;

                if (run && cooldown <= 0) {
                    updateFile = true;
                    profile.cooldowns[commandName].selectmenus[selectmenuName].selectmenuExecute = now;
                }

                if (updateFile) {
                    fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(profile, null, 4));
                }

                return { cooldown, serverCooldown };

        }
    } catch (err) {
        console.error(logger.log(err.stack, ['Error']));
        return { cooldown: -1 };
    }

}

module.exports = getCooldown;