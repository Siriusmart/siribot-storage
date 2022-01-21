const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const {
    MessageEmbed, MessageActionRow, MessageButton
} = require('discord.js');

const pong = new MessageEmbed()
    .setTitle('🏓Pong!')
    .setColor('#0099ff');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get bot http and API latency')
        .addStringOption((option) =>
            option.setName('hidden')
                .setDescription('Should the response be hidden or not')
                .addChoice('Yes', 'true')
                .addChoice('No', 'false')),

    execute(inter, { logger, su, catchFilter }) {
        const hidden = inter.options.getString('hidden') === 'true';
        let pongCopy = pong;
        pongCopy
            .setTimestamp()
            .setDescription(`**Latency** (http): ${new Date().getTime() - inter.createdTimestamp}ms\n**Latency** (ws): ${inter.client.ws.ping}ms`);
        inter.reply({
            embeds: [pongCopy],
            ephemeral: hidden
        }).catch((err) => {
            const stack = err.stack;
            if (catchFilter(stack)) {
                console.log(logger.log(stack, ['Error', 'Command/Reply']));
            }
        });
    }
}