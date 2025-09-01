const { Guild, User } = require("../../models/schemas");
const { client } = require("../../index");
const { confirmation_embed, justify_logs_embed } = require("./_embeds");
module.exports = {
    execute: async (interaction) => {
        if(!interaction.isModalSubmit()) return
        const justificativa = interaction.fields.getTextInputValue('justification')

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        const userData = await User.findOne({ id: interaction.user.id }) || new User({ id: interaction.user.id })

        userData.justificativas.push({ date: Date.now() - 1000 * 60 * 60 * 3, text: justificativa })

        guildData.justificativas += 1
        await guildData.save()

        const channel = client.channels.cache.get(guildData.activity.justify)

        await channel.send({ embeds: [justify_logs_embed(interaction, guildData.justificativas, justificativa)] }).catch(err => interaction.reply({ content: "canal de justificativas não definido", ephemeral: true }))

        interaction.reply({ embeds: [confirmation_embed()], ephemeral: true })
    }
}