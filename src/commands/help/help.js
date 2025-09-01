const { SlashCommandBuilder } = require('discord.js')
const { dotfill_emoji, dotunfill_emoji  } = require("../../../emojis.json")
const { bot_commands_embed } = require('./_embeds')
const [e1,e2] = [`<${dotfill_emoji}>`,`<${dotunfill_emoji}>`]

const code = async (interaction,user ) => {

    const prefix = interaction.client.prefix

    const comandos = {
        "config":`Este comando mostra minhas configurações neste servidor **\`${prefix}config\`** ou simplesmente **\`/config\`**`,
        "addcargo":`Este comando requer o ID ou uma menção em um cargo válido para adicionar aos mencionados **\`${prefix}addcargo @cargo\`** ou simplesmente **\`/addcargo\`**`,
        "removercargo":`Este comando requer o ID ou uma menção em um cargo válido para remover dos mencionados **\`${prefix}removercargo @cargo\`** ou simplesmente **\`/removercargo\`**`,
        "addcanal":`Este comando requer o ID ou uma menção em um cargo válido **\`${prefix}addcanal #canal\`** ou simplesmente **\`/addcanal\`**\n${e2} O comando **\`addcanal\`** faz com que o bot cheque se as mensagens do canal contem imagens ou não.`
    }

    await interaction.reply({ embeds:[bot_commands_embed(comandos)] })
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Menu de ajuda para comandos do bot'),
    run: async (interaction, client, typo) => {

    code(interaction, interaction.user)
    },
    execute: async (message, client, input1, typo) => {

    code(message, message.author)
    }
}