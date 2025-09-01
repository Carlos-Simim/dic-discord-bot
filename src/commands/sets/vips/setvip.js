const { SlashCommandBuilder } = require('discord.js')
const { embed_404_error_message, success_embed } = require('../../../global/_embeds')
const { Guild } = require('../../../models/schemas')
const { dotfill_emoji } = require("../../../../emojis.json")
const code = async (interaction, role) => {
    if (role === undefined) return interaction.reply({ embeds: [embed_404_error_message("Cargo inválido")] })

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    if (guildData.vipRoles === role.id) {

        return interaction.reply({ embeds: [embed_404_error_message("Este já é o atual cargo de vip")] })

    }

    guildData.vipRoles = role.id
    await guildData.save()

    return interaction.reply({ embeds: [success_embed(`<${dotfill_emoji}> Role ${role} foi adicionado aos vips com sucesso.`)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setvip')
        .setDescription('Defina o cargo de vip para acessar as musicas')
        .addRoleOption(option =>
            option.setName('cargo').setDescription("Escolha o cargo").setRequired(true)
        ),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.options.getRole("cargo"))
    },
    execute: async (message, client, input1, typo) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(input1)

        code(message, role)
    }
}