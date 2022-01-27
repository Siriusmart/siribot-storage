const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

const msg = new MessageEmbed()
    .setColor('#99ee99')
    .setTitle('✅Config Synced to Files')
    .setDescription('The config files has successfully been synced to the config files (to the actual files in storage)');

module.exports = {
    isCommand: true,
    data: new SlashCommandBuilder()
        .setName('sync-settings')
        .setDescription('Update settings for the bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('configs')
                .setDescription('Sync config files')),


    subcommands: {
        configs(inter, { logger, botPath }, { updateConfig }) {
            const configs = require(`../../${botPath}/functions/utilities/getConfigs`)();
            updateConfig(configs);

            let msgCopy = msg;
            msgCopy.setTimestamp();

            inter.reply({
                embeds: [msgCopy],
                ephemeral: true,
            }).catch((err) => {
                console.log(logger.log(err.stack, ['Error', 'Command/Reply']));
            });
        },
    }
}