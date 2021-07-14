const Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.adhelp) return message.channel.send('Cette commande n\'existe pas.')
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**Commande : ${command.name}**\n\n${command.adhelp.description}\n\nSyntaxe : \`${config.prefix}${command.name}${command.adhelp.syntax ? ` ${command.adhelp.syntax}` : ''}\``))
        }
        else {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Liste des commandes')
                .setDescription(`${client.commands.filter(command => command.adhelp).map(command => `\`${config.prefix}${command.name}\``).join(' ')}\n\nPour plus d'informations sur une commande, tapez \`${config.prefix}adhelp [nom de la commande]\``))
        }
    },
    name: 'adhelp',
    adhelp: {
        description: 'Cette commande permet d\'avoir de l\'aide pour les admins.',
        syntax: '[nom de la commande]'
    }
}