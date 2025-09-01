const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off, vip] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136', "#ff00b8"]
const { EmbedBuilder } = require('discord.js')
const { dotfill_booster, engine_booster, dotunfill_booster } = require('../../../emojis.json')
const e = '```'
const [e1, e2, e3] = [`<${dotfill_booster}>`, `<${engine_booster}>`, `<${dotunfill_booster}>`]
const dotURL = "https://cdn.discordapp.com/attachments/1042524280602243214/1049719156146192424/dotfill_booster.png"
this.confirm_embed = (nome, link) => {
    return new EmbedBuilder()
        .setTitle(`${e2} Booster link system.`)
        .setDescription(`${e1} **As informações abaixo estão corretas?**\n\n${e3} _**NOME DA PLAYLIST**_\n${e}${nome}${e}\n${e3} _**LINK**_\n${e}${link}${e}`)
        .setColor(vip)
}

this.success_playlist_add = (nome, link) => new EmbedBuilder()
    .setDescription(`${e1} _Playlist: **[${nome}](${link})** salva com sucesso!_\n${e3} Veja seus links digitando \`/playlist\` ou \`d!playlist\``)
    .setColor(vip)

this.error_playlist_add = () => new EmbedBuilder()
    .setDescription(`${e2} _Operação cancelada_`)
    .setColor(vip)

this.not_premium_embed = (user) => new EmbedBuilder()
    .setDescription(`${e1} _**Olá, ${user} parece que você não possui o cargo necessário para utilizar este comando**_`)
    .setColor(vip)