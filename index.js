const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(config.token)
client.commands = new Discord.Collection()
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
//BOT ONLINE
client.on("ready", async () => {
    console.log("BOT OP")
    client.user.setStatus("dnd");
    setTimeout(() => {
    client.user.setActivity("En développement");
    }, 100)
});

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

//ARRIVAL
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(` **Salut ${member} ! Prends donc place chez les Noobistes. Nous sommes désormais ${member.guild.memberCount} ! 🎉**`)
        .setImage('https://media.discordapp.net/attachments/786665816195727361/808797818818396170/Copie_de_Sans_titre_9.gif')
        .setColor('RANDOM'))
})
 
//DEPARTURE
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag}**, C'EST PAS UN MOULIN ICI!`)
        .setImage('https://media.discordapp.net/attachments/786665816195727361/808797818818396170/Copie_de_Sans_titre_9.gif')
        .setColor('RANDOM'))
})

//REACTION ROLE
client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})
 
client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})


client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

//DeleteMessage
client.on('messageDelete', async message => {
    const embedLogsMessageDelete = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    .addField('Message supprimé', message.content)
    .addField('Salon où le message a été supprimé', message.channel)
    .setTimestamp()
    .setColor('#FF0000')
    message.guild.channels.cache.get(config.logsDelete).send(embedLogsMessageDelete)
      
})

//UpdateMessage
client.on('messageUpdate', async ( newMessage, oldMessage) =>{
    const embedLogsMessageUpdate = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL({dynamic: true}))
    .addField('Message modifié', newMessage.content)
    .addField('Nouveau message', oldMessage.content)
    .addField('Salon où le message a été modifié', oldMessage.channel)
    .setTimestamp()
    .setColor('#008000')
    newMessage.guild.channels.cache.get(config.logsUpdate).send(embedLogsMessageUpdate)
      
})