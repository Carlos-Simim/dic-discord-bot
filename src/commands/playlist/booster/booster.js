const { SlashCommandBuilder } = require('discord.js')
const { dotfill_emoji, dotunfill_emoji } = require("../../../../emojis.json")
const { bot_commands_embed } = require('./_embeds')
const [e1, e2] = [`<${dotfill_emoji}>`, `<${dotunfill_emoji}>`]

const code = async (interaction, user) => {

    const prefix = interaction.client.prefix

    const comandos = {
        "addplaylist": `Este comando permite salvar uma playlist **\`${prefix}addplaylist <nome> <link>\`** ou simplesmente **\`/addplaylist\`**`,
        "removerplaylist": `Este comando requer o ID da playlist ou numero respectivo destacado ao digitar \`/playlist\` **\`${prefix}removerplaylist <id>\`** ou simplesmente **\`/removerplaylist\`**`,
        "playlist": `Este comando requer opcionalmente a pagina da playlist ou automaticamente a primeira **\`${prefix}playlist [pagina]\`** ou simplesmente **\`/playlist\`**`,
    }

    await interaction.reply({ embeds: [bot_commands_embed(comandos)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('booster')
        .setDescription('Menu de ajuda para comandos dos boosters'),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.user)
    },
    execute: async (message, client, input1, typo) => {

        code(message, message.author)
    }
}