const { Guild } = require("../../models/schemas")
const { client } = require("../../index")
const { complete_logs_embed, confirmation_embed } = require("./_embeds")
module.exports = {
    execute: async (interaction) => {
        
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        
        const channel = await client.channels.cache.get(guildData.activity.confirm)
        guildData.registros += 1
        
        await channel.send({embeds:[complete_logs_embed(interaction, guildData.registros)]}).catch(err => { return interaction.reply("canal de logs para atividades não definido")})
        await guildData.save()
        
        interaction.reply({ embeds:[confirmation_embed(interaction)],ephemeral:true})
    }
}