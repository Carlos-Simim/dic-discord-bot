const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild } = require('../../../models/schemas')
const { dotfill_emoji } = require('../../../../emojis.json')
const { success_embed, warning_option_embed } = require('./_embeds')
const { delete_button } = require('./_buttons')
const { embed_404_error_message } = require('../../../global/_embeds')
const { verify } = require('../../../configs/utils/debug')

const code = async (interaction, user, channel) => {

    if (await verify(interaction, user)) return

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    if (!guildData.monitorChannel.includes(channel)) {

       guildData.monitorChannel.push(channel)

        await guildData.save()

        const text = `<${dotfill_emoji}> Canal de verificação ${await interaction.guild.channels.cache.get(channel)} adicionado com sucesso.`

        return await interaction.reply({ embeds: [success_embed(text)] })
    }

    const msg = await interaction.reply({ embeds: [warning_option_embed(await interaction.guild.channels.cache.get(channel))], components: [delete_button()], ephemeral: true })
    const filter = i => i.user.id === interaction.user.id
    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: 15000 })
    collector.on("collect", async i => {

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

        guildData.monitorChannel.splice(guildData.monitorChannel.indexOf(channel), 1)
        await guildData.save()

        return interaction.editReply({ embeds: [success_embed(`<${dotfill_emoji}> Canal ${await interaction.guild.channels.cache.get(channel)} removido com sucesso.`)], components: [], ephemeral: true })

    })

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcanal')
        .setDescription('Adiciona o canal atual ao canal a lista de canais vigiados ou outro especificado.')
        .addChannelOption(option =>
            option
                .addChannelTypes(ChannelType.GuildText)
                .setName('canal')
                .setDescription('Escolha um canal para monitorar e enviar notificação aos staffs')
        ),
    run: async (interaction, client) => {
        const channel = interaction.options.getChannel("canal") || interaction.channel

        code(interaction, interaction.user, channel.id)

    },
    execute: async (message, client, input1, args) => {

        
        let channel = await message.guild.channels.cache.get(input1) || message.mentions.channels.first()
        if (!input1) channel = message.channel
        
        if (channel === undefined) return message.reply({ embeds: [embed_404_error_message(`O canal especificado: **\`${input1}\`** não existe ou não foi encontrado.`)] })

        code(message, message.author, channel.id)
    }

}