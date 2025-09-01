const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { dotfill_emoji, dotunfill_emoji, engine_emoji } = require('../../../emojis.json')
const moment = require("moment")
const [e1, e2, e3, e4] = [`<${dotfill_emoji}>`, `<${dotunfill_emoji}>`, `<${engine_emoji}>`, '```']

this.justify_logs_embed = (interaction, valor, texto) => new EmbedBuilder()
    .setDescription(`${e3} Registro nº **\`#${valor}\`**\n${e1} \`${interaction.user.username}\` Enviou uma justificativa, **\`${moment(Date.now()).format("DD/MM/YYYY, hh:mm:ss")}\`**\n\n${e1} JUSTIFICATIVA${e4}${texto}${e4}\n${e2} ${interaction.user} ID: \`${interaction.user.id}\``)
    .setColor(twitterBlue)

this.confirmation_embed = (interaction) => new EmbedBuilder()
    .setDescription(`${e1} Justificativa recebida com sucesso!.`)
    .setColor(spotifyGreen)