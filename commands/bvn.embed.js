const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('BIENVENUE CHEZ NOOBISTE')
            .setDescription(' **Nous sommes ravis de t\'avoir parmi nous!**')
            .setColor('RANDOM')
            .addField('Maintenant que tu es là,', 'tu peux aller te présenter dans le channel #presentation, et direction *l\'aventure!*', true)
            .setImage('https://cdn.discordapp.com/attachments/850394013042999357/864625386816798720/Image27.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/850394013042999357/864624198784778280/image0.png')
            .setTimestamp()
            .setURL('https://www.loups-garous-en-ligne.com/hameau?tag=NASHE#hameau'))
            message.delete()
    },
    name: 'bvn'
}