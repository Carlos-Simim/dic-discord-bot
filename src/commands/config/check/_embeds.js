const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { engine_emoji } = require("../../../../emojis.json")

this.display_embed = (data, interaction) => new EmbedBuilder()
    .setTitle(`<${engine_emoji}> Configurações: \`${interaction.guild.name}\``)
    .setDescription(data)
    .setColor(off)


this.sucess_embed = text => new EmbedBuilder()
    .setDescription(text)
    .setColor(spotifyGreen)