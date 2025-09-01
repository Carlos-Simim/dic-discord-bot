const { perm_error_embed } = require("../../global/_embeds")

module.exports = {
    check: (info) => {
        const top = "\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓"
        const bottom = "\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n"
        console.log(`\n\n${top}\n\n\x1b[33m${info}\n\n${bottom}\n\n`)
    },
    verify: async (interaction, user) => {
        if (!interaction.member.permissions.has('Administrator')) {
            await interaction.reply({ embeds:[perm_error_embed(user)], ephemeral: true })
            return true
        }
        return false
    }
}
