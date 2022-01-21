const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const {
    MessageEmbed, MessageActionRow, MessageButton
} = require('discord.js');

const fs = require('fs');
const noPerms = new MessageEmbed()
    .setTitle('❌No Permission')
    .setDescription('You do not have permission to enter superuser mode here')
    .setColor('#990000');
const guildDm = new MessageEmbed()
    .setTitle('❌No Server Specified')
    .setDescription('You should enter superuser mode in that specific server by using the command in that server, not in DMs')
    .setColor('#990000');
const noChange = new MessageEmbed()
    .setTitle('⚠️Nothing Changed')
    .setColor('#0099ff');
const success = new MessageEmbed()
    .setTitle('✅Changes Applied')
    .setColor('#99ee99');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('su')
        .setDescription('Enable/Disable superuser mode')
        .addStringOption((option) =>
            option.setName('set')
                .setDescription('Enable or disable superuser mode')
                .addChoice('Enable', 'true')
                .addChoice('Disable', 'false')
                .setRequired(true))
        .addStringOption((option) =>
            option.setName('type')
                .setDescription('Which superuser mode to enable')
                .addChoice('Server only', 'guild')
                .addChoice('Global', 'global')
                .setRequired(true)),

    execute(inter, { storagePath, superusers, logger, catchFilter }, { updateSu }) {

        if (inter.options.getString('type') === 'guild') {
            if (inter.guild !== null) {
                if (superusers[inter.guild.id] === undefined || !superusers[inter.guild.id].superusers.includes(inter.user.id)) {

                    let noPermsCopy = noPerms;
                    noPermsCopy.setTimestamp();
                    inter.reply({ ephemeral: true, embeds: [noPermsCopy] }).then(() => { }).catch((err) => {
                        const stack = err.stack;
                        if (catchFilter(stack)) {
                            console.log(logger.log(stack, ['Error', 'Command/Reply']));
                        }
                    });

                } else {

                    let setTo = inter.options.getString('set') === 'true';
                    if (setTo === superusers[inter.guild.id].currentOn.includes(inter.user.id)) {
                        let noChangeCopy = noChange;
                        noChangeCopy.setTimestamp().setDescription(`Nothing changed, you are already ${setTo ? '' : 'not '}a superuser in ${inter.guild.name}`);
                        inter.reply({ ephemeral: true, embeds: [noChangeCopy] }).then(() => { }).catch((err) => {
                            const stack = err.stack;
                            if (catchFilter(stack)) {
                                console.log(logger.log(stack, ['Error', 'Command/Reply']));
                            }
                        });
                    } else {
                        if (setTo) {
                            superusers[inter.guild.id].currentOn.push(inter.user.id);
                        } else {
                            superusers[inter.guild.id].currentOn.splice(superusers[inter.guild.id].currentOn.indexOf(inter.user.id), 1);
                        }
                        fs.writeFileSync(`${storagePath}/profiles/superusers/${inter.guild.id}.json`, JSON.stringify(superusers[inter.guild.id], null, 4));
                        updateSu(superusers);
                        let successCopy = success; successCopy.setTimestamp().setDescription(`You have ${setTo ? 'enabled' : 'disabled'} superuser mode in ${inter.guild.name}`)
                        inter.reply({ ephemeral: true, embeds: [successCopy] }).then(() => { }).catch((err) => {
                            const stack = err.stack;
                            if (catchFilter(stack)) {
                                console.log(logger.log(stack, ['Error', 'Command/Reply']));
                            }
                        });
                    }
                }

            } else {
                let guildDmCopy = guildDm;
                guildDmCopy.setTimestamp();
                inter.reply({ ephemeral: true, embeds: [guildDmCopy] }).then(() => { }).catch((err) => {
                    const stack = err.stack;
                    if (catchFilter(stack)) {
                        console.log(logger.log(stack, ['Error', 'Command/Reply']));
                    }
                });
            }
        } else {

            if (superusers.master.superusers.includes(inter.user.id)) {
                let setTo = inter.options.getString('set') === 'true';

                if (setTo === superusers.master.currentOn.includes(inter.user.id)) {
                    let noChangeCopy = noChange;
                    noChangeCopy.setTimestamp().setDescription(`Nothing changed, you are already ${setTo ? '' : 'not '}a superuser globally`);
                    inter.reply({ ephemeral: true, embeds: [noChangeCopy] }).then(() => { }).catch((err) => {
                        const stack = err.stack;
                        if (catchFilter(stack)) {
                            console.log(logger.log(stack, ['Error', 'Command/Reply']));
                        }
                    });
                } else {
                    if (setTo) {
                        superusers.master.currentOn.push(inter.user.id);
                    } else {
                        superusers.master.currentOn.splice(superusers.master.currentOn.indexOf(inter.user.id), 1);
                    }
                    fs.writeFileSync(`${storagePath}/profiles/superusers/master.json`, JSON.stringify(superusers.master, null, 4));
                    updateSu(superusers);
                    let successCopy = success; successCopy.setTimestamp().setDescription(`You have ${setTo ? 'enabled' : 'disabled'} superuser mode globally`)
                    inter.reply({ ephemeral: true, embeds: [successCopy] }).then(() => { }).catch((err) => {
                        const stack = err.stack;
                        if (catchFilter(stack)) {
                            console.log(logger.log(stack, ['Error', 'Command/Reply']));
                        }
                    });
                }

            } else {
                inter.reply({ ephemeral: true, embeds: [noPerms.setTimestamp()] }).then(() => { }).catch((err) => {
                    const stack = err.stack;
                    if (catchFilter(stack)) {
                        console.log(logger.log(stack, ['Error', 'Command/Reply']));
                    }
                });

            }
        }
    }
}