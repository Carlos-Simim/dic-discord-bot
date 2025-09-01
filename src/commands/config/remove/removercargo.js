const { SlashCommandBuilder } = require('discord.js')
const { verify } = require('../../../configs/utils/debug')
const { embed_404_error_message, success_embed } = require('../../../global/_embeds')
const { Guild } = require('../../../models/schemas')

const code = async (interaction, role, user) => {
    if (await verify(interaction, user)) return
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    if (!role || role.length < 5) return interaction.reply({ embeds: [embed_404_error_message(`Id do cargo \`${role}\` não foi encontrado`)] })

    let foundRole

    if (!role.startsWith("<@&")) {

        foundRole = await interaction.guild.roles.cache.get(role)
        if (foundRole === undefined) return interaction.reply({ embeds: [embed_404_error_message(`Id do cargo \`${role}\` não foi encontrado`)] })
        if (!guildData.mention.includes(role)) return interaction.reply({ embeds: [embed_404_error_message("cargo não se encontra na lista de menções automáticas.")], ephemeral: true })

        guildData.mention.splice(guildData.mention.indexOf(role), 1)
        await guildData.save()

    } else {

        const formatedRole = role.slice(3, role.length - 1)
        foundRole = await interaction.guild.roles.cache.get(formatedRole)
        if (foundRole === undefined) return interaction.reply({ embeds: [embed_404_error_message(`Id do cargo \`${role}\` não foi encontrado`)] })
        if (!guildData.mention.includes(formatedRole)) return interaction.reply({ embeds: [embed_404_error_message("cargo não se encontra na lista de menções automáticas.")], ephemeral: true })

        guildData.mention.splice(guildData.mention.indexOf(formatedRole), 1)
        await guildData.save()

    }


    let text = `Cargo: ${foundRole} removido da lista de menções automáticas com sucesso.`
    await interaction.reply({ embeds: [success_embed(text)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removercargo')
        .setDescription('Remove um cargo individual da lista de cargos a serem mencionados automaticamente')
        .addRoleOption(role =>
            role.setName('cargo').setDescription("cargo alvo").setRequired(true)),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.options.getRole("cargo").id, interaction.user)
    },
    execute: async (message, client, input1, typo) => {

        code(message, input1, message.author)
    }
}