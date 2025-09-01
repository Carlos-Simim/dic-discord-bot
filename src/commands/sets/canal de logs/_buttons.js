const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.link_button = (url) => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setURL(url)
        .setStyle(Link)
        .setLabel("Acessar")
)