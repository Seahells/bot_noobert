const Discord = require('discord.js')
 
module.exports = {
    run: (message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Résultat de ton **bingoolo**')
            .setColor('RANDOM')
            .setDescription([Math.floor(Math.random() * 90) + 1]))
    },
    name: 'bingoolo',
    help: {
        description: "Balance un nombre random pour un bingo.",
        syntax: ``
    }
}
