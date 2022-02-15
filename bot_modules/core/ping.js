const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const {
    MessageEmbed, MessageActionRow, MessageButton
} = require('discord.js');

const pong = new MessageEmbed()
    .setTitle('🏓Pong!')
    .setColor('#0099ff');

function getMessage(inter) {
    let pongCopy = pong;
    pongCopy
        .setTimestamp()
        .setDescription(`**Latency** (http): ${new Date().getTime() - inter.createdTimestamp}ms\n**Latency** (ws): ${inter.client.ws.ping}ms`);
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`ping|pingAgain|${inter.user.id}`)
                .setLabel('Ping Again')
                .setStyle('PRIMARY')
        );

    return {
        embeds: [pongCopy],
        components: [row],
    };

}

module.exports = {
    isCommand: true,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get bot http and API latency')
        .addStringOption((option) =>
            option.setName('hidden')
                .setDescription('Should the response be hidden or not')
                .addChoice('Yes', 'true')
                .addChoice('No', 'false')),

    execute(inter, { logger }) {

        const hidden = inter.options.getString('hidden') === 'true';

        inter.reply({
            ...getMessage(inter),
            ephemeral: hidden,
        }).catch((err) => {
            console.log(logger.log(err.stack, ['Error', 'Command/Reply']));
        });
    },

    buttons: {
        pingAgain(inter, { logger }) {
            inter.update(getMessage(inter)).then(() => { }).catch((err) => {
                console.log(logger.log(err.stack, ['Error', 'Command/Reply']));
            });
        }
    }
}