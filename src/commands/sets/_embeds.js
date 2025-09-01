const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { dotunfill_emoji } = require("../../../emojis.json")

this.success_embed = text => new EmbedBuilder()
    .setDescription(text)
    .setColor(spotifyGreen)

this.warning_option_embed = channel => new EmbedBuilder()
    .setDescription(`<${dotunfill_emoji}> Ops, canal ${channel} já configurado! Gostaria de remover?`)
    .setColor(softRed)

