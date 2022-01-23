const { MessageEmbed } = require('discord.js');
let parseDate;

function cooldown(wait, defWait, botPath, type) {
    if (parseDate === undefined) {
        parseDate = require(`../${botPath}/functions/utilities/parseDate`);
    }

    return new MessageEmbed()
        .setTitle('🏖️Take A Chill Pill')
        .setDescription(`The default cooldown for this ${type} is ${parseDate(defWait)}, please wait ${parseDate(wait, true)}`)
        .setTimestamp()
        .setColor('#0099ff');
}

module.exports = cooldown;