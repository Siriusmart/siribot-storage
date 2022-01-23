const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');


module.exports = {
    isCommand: true,
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Get information from YouTube')
        .addSubcommand(subcommand =>
            subcommand
                .setName('video')
                .setDescription('Info about a YouTube video')
                .addStringOption(option => option.setName('id').setDescription('Video ID').setRequired(true))),
    
    subcommands: {
        video(inter, { logger }){
            inter.reply('Command ran').catch((err) => {
                console.log(logger.log(err.stack, ['Error', 'Command/Reply']));
            });
        }
    }
}