function messageUser({ user, MessageEmbed }) {
    return {
        embeds: [new MessageEmbed()
            .setColor('#99ff99')
            .setTimestamp()
            .setTitle('✅ **Bot Has Started**')
            .setDescription(`Hello <@${user.id}> You can now use the bot, hurray!`)
            .setFooter({ text: 'Bot made by Siriusmart' })]
    }
}

function messageChannel({ channel, MessageEmbed }) {
    return {
        embeds: [new MessageEmbed()
            .setColor('#99ff99')
            .setTimestamp()
            .setTitle('✅ **Bot Has Started**')
            .setDescription(`Hello people in <#${channel.id}>. You can now use the bot, hurray!`)
            .setFooter({ text: 'Bot made by Siriusmart' })]
    };
}

module.exports = { messageUser, messageChannel };