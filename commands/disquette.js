const Discord = require('discord.js'),
    replies = ['Tu ne serais pas une Danette? Parce que je vais te lécher jusqu\'au fond.', 'Tu serais pas un trampoline? Parce que j\'ai très envie de te sauter.', 'Tu serais pas un hot-dog? Parce que j\'y mettrais bien ma saucisse.', 'Je ne suis pas pâtissier.ère, mais j\'ai bien envie de te fourrer.', 'Tu serais pas une drogue? Parce que je suis accro à ton charme', 'Tu serais pas un verbe? Parce que tu es plus que parfait.e', 'Tu serais pas un mouton? Parce que je te sauterais bien.', 'Tu serais pas un burrito? Parce que tu es vachement bien roulé.e', 'Tu serais pas une tasse de thé? Parce que j\'ai bien envie d\'y tremper mon biscuit', 'Tu serais pas un café? Parce que tu m\'excites dès le matin.', 'Je coche quelle case de mon attestation pour pouvoir sortir avec toi?', 'Tu serais pas une biche? Parce que je te mettrais bien une cartouche', 'Tu serais pas un cul sec? Parce que tu me fais perdre tous mes moyens', 'Tu ne veux pas faire du stop? Pour que je te prenne à l\'arrière de ma voiture', 'Tu veux être mon meuble IKEA? Pour que je te monte pendant des heures', 'Tu serais pas une addition? Parce que tu vas prendre cher', 'Ton père serait pas agriculteur? Parce qu\'il t\'a mis deux beaux melons', 'Tu serais pas une crêpe? Parce que j\'ai très envie de te retourner', 'J\'ai beau chercher dans mon frigo, je ne trouve pas plus frais que toi', 'Tu aurais pas un problème de vue? Car tu as besoin d\'une bonne correction', 'Tu serais pas un haltère? Parce que j\'aimerais te soulever', 'Tu serais pas un pot de Nutella? Parce que je te finirais bien au doigt', 'Tu veux être ma lampe de chevet? Pour que je t\'allume tous les soirs']
 
module.exports = {
    run: (message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Et une belle disquette :')
            .setDescription(replies[Math.floor(Math.random() * replies.length)]))
    },
    name: 'disquette',
    help: {
        description: "Envoie une disquette random.",
        syntax: `     ou <@membre>`
    }
}