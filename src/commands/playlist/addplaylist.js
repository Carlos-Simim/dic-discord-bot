const { SlashCommandBuilder } = require('discord.js')
const { confirm_buttons } = require('./_buttons')
const { confirm_embed, error_playlist_add, success_playlist_add, not_premium_embed } = require('./_embeds')
const { User, Guild } = require("../../models/schemas")
const code = async (interaction, nome, link) => {
    const member = interaction.member

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
    if(!member.permissions.has("Administrator")){

        if (!member.roles.cache.some(role => guildData.vipRoles == role.id)) return interaction.reply({
            embeds: [not_premium_embed(member)
            ]
        })

    }

    const msg = await interaction.reply({ embeds: [confirm_embed(nome, link)], components: [confirm_buttons()] })

    const filter = i => i.user.id === interaction.member.id
    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: 30000 })
    collector.on("collect", async i => {

        if (i.customId === 'recusar') {

            if (interaction.type === 0) return msg.edit({ embeds: [error_playlist_add()], components: [] })
            return interaction.editReply({ embeds: [error_playlist_add()], components: [] })

        }

        const userData = await User.findOne({ id: member.id }) || new User({ id: member.id })

        userData.playLists.push({ name: nome, url: link })
        await userData.save()

        if (interaction.type === 0) return msg.edit({ embeds: [success_playlist_add(nome, link)], components: [] })
        return interaction.editReply({ embeds: [success_playlist_add(nome, link)], components: [] })

    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addplaylist')
        .setDescription('Salve uma playlist para acessar de modo facil depois')
        .addStringOption(option =>
            option.setName("nome").setDescription("Nome da sua playlist").setRequired(true))
        .addStringOption(option =>
            option.setName("link").setDescription("link da sua playlist").setRequired(true)
        ),
    run: async (interaction, client, typo) => {
        const nome = interaction.options.getString("nome")
        const link = interaction.options.getString("link")

        code(interaction, nome, link)
    },
    execute: async (message, client, input1, args) => {

        code(message, input1, args[1])
    }
}