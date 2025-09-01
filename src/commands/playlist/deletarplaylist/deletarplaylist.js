const { SlashCommandBuilder } = require('discord.js')
const { embed_404_error_message } = require('../../../global/_embeds')
const { Guild, User } = require('../../../models/schemas')
const { not_premium_embed } = require('../_embeds')
const { success_delete } = require('./_embeds')
const { dotfill_booster, dotunfill_booster } = require("../../../../emojis.json")

const code = async (interaction, number, user) => {

    if (!user) user = interaction.member.user
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
    if(number < 1) number = 1
    if (!interaction.member.permissions.has("Administrator")) {

        if (!interaction.member.roles.cache.some(role => guildData.vipRoles == role.id)) return interaction.reply({
            embeds: [not_premium_embed(interaction.member)
            ]
        })

    }

    const userData = await User.findOne({ id: interaction.member.id }) || new User({ id: interaction.member.id })
    
    await interaction.reply({ embeds:[success_delete(`<${dotfill_booster}> _PLAYLIST: \`${userData.playLists[number - 1].name}\` Deletada com sucesso._`)]})
    userData.playLists.splice(number - 1, 1)
    await userData.save()
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletarplaylist')
        .setDescription('deleta um de suas playlists')
        .addNumberOption(option =>
            option.setName("numero").setDescription("numero da playlist na lista").setRequired(true)),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.options.getNumber("numero"))
    },
    execute: async (message, client, input1, typo) => {

        if (input1 != Number(input1)) return message.reply({ embeds: [embed_404_error_message("Valor inválido")] })

        code(message, input1)
    }
}