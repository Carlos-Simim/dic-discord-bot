const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle
const { trash_emoji } = require("../../../emojis.json")

this.delete_button = () => new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId('delete_button')
        .setEmoji(trash_emoji)
        .setStyle(Danger)
)
