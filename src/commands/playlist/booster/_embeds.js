const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { dotfill_booster, dotunfill_booster  } = require("../../../../emojis.json")
const [e1,e2] = [`<${dotfill_booster}>`,`<${dotunfill_booster}>`]

this.bot_commands_embed = text => {
    finalText = ''
    for(const key in text){
        finalText += `${e1} \`${key}\`: ${text[key]}\n\n`
    }
    
    const embed = new EmbedBuilder()
        .setDescription(finalText)
        .setColor("ff00b8")
    return embed
}