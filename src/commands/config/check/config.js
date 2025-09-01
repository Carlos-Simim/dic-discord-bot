const { SlashCommandBuilder } = require('discord.js')
const { Guild } = require('../../../models/schemas')
const { display_embed } = require("./_embeds")
const { dotfill_emoji, dotunfill_emoji } = require("../../../../emojis.json")
const { reset_button } = require('./_buttons')
const { verify } = require('../../../configs/utils/debug')
const { success_embed } = require('../../../global/_embeds')
const [e1, e2] = [`<${dotfill_emoji}>`, `<${dotunfill_emoji}>`]

const code = async (interaction, user) => {
    if (await verify(interaction, user)) return

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    let [channels, roles] = [[], []]

    for (const key of guildData.mention) {
        roles.push(await interaction.guild.roles.cache.get(key))
    }
    for (const key of guildData.monitorChannel) {
        channels.push(await interaction.guild.channels.cache.get(key))
    }
    const e = "```"
    const text = `${e1} Roles definidas para menção automática:\n${e2}${roles.length === 0 ? 'Nenhuma' : roles}${e} ${roles.length === 0 ? '--' : roles}${e}\n${e1} Canais que estou de olho:\n ${e2} ${channels.length === 0 ? 'Nenhum' : channels}${e}${channels.length === 0 ? '--' : channels}${e}\n ${e1} LOGS:\n${e2} ${await interaction.guild.channels.cache.get(guildData.logsChannel) || 'Não definido'} ${e} ${guildData.logsChannel === null ? '--' : guildData.logsChannel} ${e}`

    const msg = await interaction.reply({ embeds: [display_embed(text, interaction)], components: [reset_button()], ephemeral: true })
    const filter = i => i.user.id === user.id
    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: 30000 })

    collector.on("collect", async i => {
        guildData.mention = []
        guildData.monitorChannel = []
        guildData.logsChannel = null
        await guildData.save()
        console.log(interaction.type)
        if (interaction.type === 0) return msg.edit({ embeds: [success_embed(`${e1} Configurações resetadas com sucesso.`)], components: [] })

        return interaction.editReply({ embeds: [success_embed(`${e1} Configurações resetadas com sucesso.`)], components: [] })

    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Checa os canais em observação e os cargos a serem marcados'),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.user)
    },
    execute: async (message, client, input1, typo) => {

        code(message, message.author)
    }
}

