const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.close_button = () => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId('delete_ticket')
        .setEmoji('<a:lock_emoji:1052634025807855686>')
        .setStyle(Danger)
)

this.url_button = (url) => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setURL(url)
        .setEmoji('<:link_emoji:1052637470954631169>')
        .setLabel("Clique aqui para ser redirecionado ao canal do ticket.")
        .setStyle(Link)
)
