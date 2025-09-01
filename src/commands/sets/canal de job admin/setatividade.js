const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { embed_404_error_message } = require("../../../global/_embeds")
const { admin_check_buttons } = require('./_buttons')
const { atividade_admin_embed, warning_embed } = require('./_embeds')
const { Guild } = require("../../../models/schemas")
const { verify } = require('../../../configs/utils/debug')

const code = async (interaction, confirm, justify) => {
    if (await verify(interaction, interaction.member.user.username)) return
    if(interaction.type !== 0) interaction.reply({ephemeral:true,content:"Configurações concluidas."})
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.activity.confirm = confirm.id
    guildData.activity.justify = justify.id
    await guildData.save()

    await interaction.channel.send({ components: [admin_check_buttons()], embeds: [atividade_admin_embed('', interaction)] })
    await confirm.send({embeds:[warning_embed("\`Confirmação de atividade\`")]})
    await justify.send({embeds:[warning_embed("\`Justificativa das atividades\`")]})
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setatividade')
        .setDescription('Envie um botão no canal atual e defina os canais para serem enviadas seus respectivos campos.')
        .addChannelOption(option =>
            option.setName("confirmados")
                .setDescription("canal para enviar as logs dos confirmados")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption(option =>
            option.setName("justificativas")
                .setDescription("canal para enviar as logs de justificativas")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
    ,
    run: async (interaction, client, typo) => {

        code(interaction, interaction.options.getChannel("confirmados"), interaction.options.getChannel("justificativas"))
    },
    execute: async (message, client, input1, args) => {
        const confirmados = message.mentions.channels.first() || message.guild.channels.cache.get(input1)
        if (confirmados === undefined) return message.reply({ embeds: [embed_404_error_message(`Por favor defina o canal de confirmação corretamente, \`${input1}\` não foi encontrado.`)] })

        const justificativa = message.mentions.channels.last() || message.guild.channels.cache.get(args[1])
        if (justificativa === undefined) return message.reply({ embeds: [embed_404_error_message(`Por favor defina o canal de justificativas corretamente, \`${input1}\` não foi encontrado.`)] })

        code(message, confirmados, justificativa)
    }
}
