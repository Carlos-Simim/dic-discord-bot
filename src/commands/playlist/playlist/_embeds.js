const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.songs_embed = async (data, user,a,t) => new EmbedBuilder()
    .setTitle(`<:engine_booster:1049556557496586301> \`${user.username.toUpperCase()}\` booster playlists  **\`[ ${a} / ${t < 2 ? 1 : t} ]\`** `)
    .setDescription(data)
    .setColor("ff00b8")
