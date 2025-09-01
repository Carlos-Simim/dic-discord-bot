const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.ticket_button = ticket => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("new_ticket")
        .setEmoji('<:ticket:1058085577351778345>')
        .setStyle(Secondary)
        .setLabel("Abrir ticket")
)