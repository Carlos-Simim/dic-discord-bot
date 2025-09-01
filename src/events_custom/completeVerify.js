const { loading_embed, log_message } = require("../global/_embeds")
const { client } = require("../index")
const { Guild, User } = require("../models/schemas")

client.on("messageReactionAdd", async interaction => {

    const user = await interaction.message.guild.members.cache.get(interaction.users.cache.last().id)
    const toverify = await interaction.message.member

    const guildData = await Guild.findOne({ id: interaction.message.guild.id }) || new Guild({ id: interaction.message.guild.id })
    if (guildData.logsChannel === null) return
    if (!guildData.monitorChannel.includes(interaction.message.channel.id)) return
    if (!user.roles.cache.some(role => guildData.mention.includes(role.id))) return

    await interaction.message.delete().catch(err => { console.log(err) })
    const verifying = await interaction.message.channel.send({ embeds: [loading_embed(user, toverify)] })

    const admin = await User.findOne({ id: user.id }) || new User({ id: user.id })
    const newguy = await User.findOne({ id: toverify.id }) || new User({ id: toverify.id })

    admin.count += 1    
    admin.registerList.push(toverify.id)
    await admin.save()

    newguy.registerBy = user.id
    newguy.registerTimestamp = Date.now()
    await newguy.save()

    const channel = await interaction.message.guild.channels.cache.get(guildData.logsChannel)

    await channel.send({ embeds: [log_message(toverify, interaction.message, user, admin.count)] })
    setTimeout( async () => await verifying.delete().catch(err => {}), 3000)

})
