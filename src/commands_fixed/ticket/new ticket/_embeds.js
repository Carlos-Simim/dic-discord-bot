const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.ticket_embed = (data, interaction) => new EmbedBuilder()
    .setTitle(`<:house:1057861593628692521> Canal de suporte \`${interaction.guild.name}\` `)
    .setDescription(data)
    .setColor(off)

this.ticket_success = (url) => new EmbedBuilder()
    .setDescription(`Ticket aberto em: ${url}`)
    .setColor(spotifyGreen)

