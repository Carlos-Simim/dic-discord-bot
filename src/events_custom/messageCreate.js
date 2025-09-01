const { client } = require("../index");
const { Guild } = require("../models/schemas");

client.on("messageCreate", async i => {
    if (i.author.bot) return;
    if (i.channel.type == "dm") return;
    const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id })
    if(!guildData.monitorChannel.includes(i.channel.id)) return

    if (i?.attachments?.first() === undefined) return
    if(i?.attachments?.first()?.contentType?.startsWith('image')){
        const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id })

        await i.react("👍").catch(err => {})
        const roles = []
        for(const key of guildData.mention){
            roles.push(await i.guild.roles.cache.get(key))
        }

        const msg = await i.channel.send(`||`+roles+`||`)
        setTimeout(async () => {
            await msg.delete().catch(err => {})
        },5000)
    }

})