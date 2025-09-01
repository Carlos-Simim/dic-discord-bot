const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.admin_check_buttons = () => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId('complete_activity')
        .setLabel('ATVD REALIZADA')
        .setEmoji(':save_emoji_white:1048833756070428735')
        .setStyle(Success),
    new ButtonBuilder()
        .setCustomId('justify_activity')
        .setLabel('JUSTIFICAR')
        .setEmoji(':Icon_Insights:1048677347425001553')
        .setStyle(Secondary)
)
