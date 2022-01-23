// message to send when user uses a disabled command or button

const { MessageEmbed } = require('discord.js');

const button = new MessageEmbed()
    .setTitle('❌Button Disabled')
    .setDescription('The button you just clicked has been disabled here by bot operator')
    .setColor('#990000');
const command_dm = new MessageEmbed()
    .setTitle('❌Command Disabled in DMs')
    .setDescription('The command was not avaliable in DMs')
    .setColor('#990000');
const command = new MessageEmbed()
    .setTitle('❌Command Disabled')
    .setDescription('The command you just used has been disabled here by bot operator')
    .setColor('#990000');
const missing_perms = new MessageEmbed()
    .setTitle('❌Missing Permissions')
    .setDescription('You do not have the permissons to run this command. If you believe this is a mistake, please set "sudo" to true or enable superuser mode')
    .setColor('#990000');


function message(info) {
    // info = {type (button, command-dm, command, missing-perms)}

    switch (info.type) {
        case 'button':
            return button.setTimestamp();

        case 'command-dm':
            return command_dm.setTimestamp();

        case 'command':
            return command.setTimestamp();

        case 'missing-perms':
            return missing_perms.setTimestamp();
    }
}

module.exports = message;