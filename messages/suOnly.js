const { MessageEmbed } = require('discord.js');

const msg = new MessageEmbed()
    .setColor('#990000')
    .setTitle('❌This Command Is Only For Superusers')
    .setDescription('You do not have permission to use do this (at least not in this server)');

function suOnly() {
    let msgCopy = msg;
    msgCopy.setTimestamp();
    return msgCopy;
}

module.exports = suOnly;