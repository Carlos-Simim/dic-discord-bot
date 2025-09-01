const { ChannelType, SlashCommandBuilder } = require('discord.js')
const { Guild } = require('../../../models/schemas.js')
const { ticket_button } = require('./_buttons.js')
const { success_embed, ticket_embed } = require('./_embeds.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Set some bot configuration')
        .addSubcommand(
            sub => sub.setName("ticket_category").setDescription("Choose a guild category for new tickets")
                .addChannelOption(
                    option => option.setName("channel").setDescription("The category for new tickets.")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildCategory)
                )
        )
        .addSubcommand(
            sub => sub.setName("ticket_channel").setDescription("Choose a channel for sending the ticket button")
                .addChannelOption(
                    option => option.setName("channel").setDescription("Channel to send the button")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand(
            sub => sub.setName("ticket_transcript").setDescription("Choose a channel for sending the ticket transcript")
                .addChannelOption(
                    option => option.setName("channel").setDescription("Channel to send the button")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        ),
    execute: async () => { },
    run: async (interaction, client) => {

        await interaction.deferReply({ ephemeral: true })

        const command = interaction.options.getSubcommand()
        const channel = interaction.options.getChannel("channel")

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

        if (command === 'ticket_category') {
            guildData.ticket.ticket_category = channel.id
            await guildData.save()

            return await interaction.editReply({ embeds: [success_embed(`${channel} set for new tickets successfully`)] })
        }

        if (command === 'ticket_transcript') {
            guildData.ticket.transcript = channel.id
            await guildData.save()

            channel.send("Agora enviarei os transcripts dos tickets neste canal :)")
            return await interaction.editReply({ embeds: [success_embed(`${channel} set for transcripts successfully`)] })
        }

        if (command === 'ticket_channel') {
            guildData.ticket.ticket_channel = channel.id
            await guildData.save()
            const text = `<:ADM:1046948387381055549> **Seja bem vindo ao suporte do servidor ${interaction.guild.name}, clique no botão abaixo para falar com nossa equipe em um canal privado.**`
            channel.send({ embeds: [ticket_embed(text)], components: [ticket_button()] })
            return await interaction.editReply({ embeds: [success_embed(`${channel} ticket button sent successfully`)] })
        }

    }
}
