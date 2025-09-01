const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { dotfill_emoji, dotunfill_emoji, engine_emoji } = require('../../../emojis.json')
const moment = require("moment")
const [e1, e2, e3] = [`<${dotfill_emoji}>`, `<${dotunfill_emoji}>`, `<${engine_emoji}>`]

this.complete_logs_embed = (interaction, valor) => new EmbedBuilder()
    .setDescription(`${e3} Registro nº **\`#${valor}\`**\n${e1} \`${interaction.user.username}\` Completou as atividades, **\`${moment(Date.now() - 1000 * 60 * 60 * 3).format("DD/MM/YYYY, HH:mm:ss")}\`**\n${e2} ${interaction.user} ID: \`${interaction.user.id}\``)
    .setColor(twitterBlue)

this.confirmation_embed = (interaction) => new EmbedBuilder()
    .setDescription(`${e1} Atividade registrada com sucesso!.`)
    .setColor(spotifyGreen)