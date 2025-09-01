const { Guild, User } = require("../../../models/schemas.js")
const { ChannelType, PermissionFlagsBits } = require("discord.js")
const { ticket_embed, ticket_success } = require("./_embeds.js")
const { close_button, url_button } = require("./_buttons.js")

module.exports = {
    execute: async (interaction, client) => {

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        const userData = await User.findOne({ id: interaction.user.id }) || new User({ id: interaction.user.id })

        const old = client.channels.cache.get(userData.ticket.id);
        if (old !== undefined) return interaction.reply({ content: `Você já possui um ticket em aberto em <#${userData.ticket.id}>`, ephemeral: true })

        const category = guildData.ticket.ticket_category

        const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-${interaction.user.discriminator}`,
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [
                        PermissionFlagsBits.ViewChannel
                    ]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                        PermissionFlagsBits.AddReactions
                    ]
                },
                {
                    id: "1282091983292334099",
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                        PermissionFlagsBits.AddReactions
                    ]
                },
                {
                    id: "1282091983279624330",
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                        PermissionFlagsBits.AddReactions
                    ]
                },
            ]
        })

        const url = `https://discord.com/channels/${interaction.guild.id}/${channel.id}`

        userData.ticket.open = true
        userData.ticket.id = channel.id
        await userData.save()

        let roles = []

        for(const key of guildData.mention){
            roles.push(await interaction.guild.roles.cache.get(key))
        }

        await interaction.reply({ embeds: [ticket_success(`<#${channel.id}>`)], components: [url_button(url)], ephemeral: true })

        const text = `<:ADM:1046948387381055549> Olá, conte o **motivo de ter aberto o ticket** para que um **dos nossos moderadores possa te ajudar com seu problema.**`
        channel.send({ content:`||`+roles+`||`, embeds: [ticket_embed(text, interaction)], components: [close_button()] }).catch(err => {})

    }
}