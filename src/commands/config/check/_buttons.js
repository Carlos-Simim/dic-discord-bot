const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle
const { trash_emoji } = require("../../../../emojis.json")

this.reset_button = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('id')
            .setLabel('Resetar')
            .setEmoji(trash_emoji)
            .setStyle(Danger)
    )
}