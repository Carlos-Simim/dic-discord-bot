const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.success_delete = data => {
    return new EmbedBuilder()
        .setDescription(data)
        .setColor("#ff00b8")
}
