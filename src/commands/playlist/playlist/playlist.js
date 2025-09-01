const { SlashCommandBuilder } = require('discord.js')
const { User, Guild } = require('../../../models/schemas')
const { not_premium_embed } = require('../_embeds')
const { songs_embed } = require('./_embeds')
const { dotfill_booster, dotunfill_booster } = require("../../../../emojis.json")

const [e1, e2] = [`<${dotfill_booster}>`, `<${dotunfill_booster}>`]

const code = async (interaction, start = 0, user) => {

    if (!user) user = interaction.member.user
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    if (!interaction.member.permissions.has("Administrator")) {

        if (!interaction.member.roles.cache.some(role => guildData.vipRoles == role.id)) return interaction.reply({
            embeds: [not_premium_embed(interaction.member)
            ]
        })

    }

    const userData = await User.findOne({ id: interaction.member.id }) || new User({ id: interaction.member.id })

    let text = ''
    const fixed = ((((!start || start < 0) ? 1 : start) * 5) - 5)  
    for (let i = fixed; i < fixed + 5; i++) {
        let playli = userData.playLists[i]
        console.log(i)
        console.log(fixed + 5)
        if (playli === undefined) break

        text += `${e1} _PLAYLIST \`${i + 1}\` **\`${playli.name.toUpperCase()}\`**_\n${e2} **_URL: ${playli.url}_**\n\n`
    }

    if( text === '') text = '**_Não há playlists para mostrar ainda._**'

    await interaction.reply({ embeds: [await songs_embed(text, user, (!start || start < 0) ? 1 : start, Math.round(userData.playLists.length/5 + 0.4))]  })

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Retorna uma lista com suas playlists salvas')
        .addNumberOption(option =>
            option.setName("pagina").setDescription("qual pagina deseja acessar")),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.options.getNumber("pagina"))
    },
    execute: async (message, client, input1, typo) => {

        code(message, input1)
    }
}