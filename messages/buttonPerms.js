const { MessageEmbed } = require('discord.js');

const noPerms = new MessageEmbed()
    .setTitle('❌You Don\'t Have Permission to Use This Button')
    .setDescription('Unless you are the intended user to use this button, or use are a superuser, you cannot use this button')
    .setColor('#990000');

function buttonPerms() {
    let noPermsCopy = noPerms;
    noPermsCopy.setTimestamp();
    return noPermsCopy;
}

module.exports = buttonPerms;