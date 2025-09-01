const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder, Embed } = require('discord.js')
const { dotfill_emoji, loading_emoji, engine_emoji, dotunfill_emoji } = require("../../emojis.json")
const e = '```'

this.success_embed = text => new EmbedBuilder()
  .setDescription(`_<${dotfill_emoji}> ${text}_`)
  .setColor(spotifyGreen)

this.embed_404_error_message = (text) => new EmbedBuilder()
  .setColor(softRed)
  .setDescription(`_❌ Ops, ${text}._`);

this.perm_error_embed = (user) => new EmbedBuilder()
  .setColor(softRed)
  .setDescription(`_<${dotfill_emoji}> ${user} Você não tem permissão para utilizar este comando!_`)

this.log_message = (member, message, admin, total) => new EmbedBuilder()
  .setTitle(`<${engine_emoji}> Verificação \`${message.guild.name}\` `)
  .setColor(off)
  .setDescription(`\n<${dotfill_emoji}> ${member} foi verificado com sucesso por: ${admin}\n<${dotunfill_emoji}> ${admin.user.username.toUpperCase()} já verificou um total de **\`${total}\`** ${total > 1 ? 'usuários' : 'usuário'}.`)
  .setImage(message.attachments.first().url)
  .setThumbnail(member.avatarURL({ size: 4096 }))
  .setFooter({ text: `+1 pra conta` })
  .setTimestamp()

this.loading_embed = (user, member) => new EmbedBuilder()
  .setDescription(`<${loading_emoji}> Olá ${member} você está sendo verificado por: ${user}, aguarde um segundo...`)
  .setColor(off)