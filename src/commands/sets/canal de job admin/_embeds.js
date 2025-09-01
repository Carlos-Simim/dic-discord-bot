const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { engine_emoji, dotfill_emoji, dotunfill_emoji  } = require("../../../../emojis.json")
const [e1,e2,e3] = [`<${engine_emoji}>`, `<${dotfill_emoji}>`, `<${dotunfill_emoji}>`]

this.atividade_admin_embed = (data, interaction) => new EmbedBuilder()
    .setDescription(`${e1} **_ATIVIDADES_** \`${interaction.guild.name.toUpperCase()}\`\n\n${e3} Utilize os botões abaixo para declarar a **_\`realização\`_** das atividades, ou **_\`justificar\`_** o motivo de não realizar.`)
    .setThumbnail(interaction.guild.iconURL({size:4096}))
    .setColor(off)

this.warning_embed = text => new EmbedBuilder()
    .setColor(attentionPurple)
    .setDescription(`${e1} Este canal foi configurado como canal de ${text}! agora as mensagens respectivas da configuração serão enviadas aqui.`)