const { SlashCommandBuilder } = require('discord.js')
const { verify } = require('../../../configs/utils/debug')
const { Guild } = require("../../../models/schemas")
const { output_embed } = require('./_embeds')
const { engine_emoji, dotfill_emoji } = require("../../../../emojis.json")
const { link_button } = require('./_buttons')
const { embed_404_error_message } = require('../../../global/_embeds')
const [e1, e2] = [`<${engine_emoji}>`, `${dotfill_emoji}`]

const code = async (interaction, member, channel) => {
    if (await verify(interaction, interaction.user)) return
    if (channel === undefined) return interaction.reply({ embeds: [embed_404_error_message("Canal inexistente")] })
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.logsChannel = channel.id
    await guildData.save()

    const b = '```'

    const text = `${e1} Canal ${channel} definido para logs com sucesso.\n${b} ID:${channel.id} ${b}\n Registrado por: ${member}`

    const url = `https://discord.com/channels/${interaction.guild.id}/${channel.id}`
    await interaction.reply({ embeds: [output_embed(text)], components: [link_button(url)] }).catch(err => { })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addlogs')
        .setDescription('Define o canal para serem enviadas os logs de confirmação.')
        .addChannelOption(option =>
            option.setName("canal").setDescription("Escolha o canal de logs")),
    run: async (interaction, client) => {

        const channel = interaction.options.getChannel("canal") || interaction.channel

        code(interaction, interaction.member, channel)
    },
    execute: async (message, client, input1, args) => {
        let channel = await message.guild.channels.cache.get(input1) || message.mentions.channels.first()
        if (!input1) channel = message.channel

        code(message, message.member, channel)
    }
}