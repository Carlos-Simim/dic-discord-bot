const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle
const { trash_emoji, dotfill_emoji } = require("../../../emojis.json")

this.confirm_buttons = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('aceitar')
            .setLabel('Adicionar')
            .setStyle(Success),
        new ButtonBuilder()
            .setCustomId('recusar')
            .setEmoji(trash_emoji)
            .setStyle(Danger)
    )
}