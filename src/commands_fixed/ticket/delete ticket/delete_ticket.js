const { Guild } = require("../../../models/schemas.js");
const { ticket_warning } = require("./_embeds.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    execute: async (interaction, client) => {
        try {
            // Verifica se já respondeu à interação
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({ embeds: [ticket_warning()] });
            } else {
                await interaction.reply({ embeds: [ticket_warning()] });
            }
        } catch (error) {
            console.warn("Não foi possível responder à interação:", error.message);
            return; // Sai da função para evitar seguir com um erro
        }

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

        const transcriptChannel = client.channels.cache.get(guildData.ticket?.transcript);

        if (!transcriptChannel) {
            console.warn("Canal de transcript não encontrado.");
            return;
        }

        const attachment = await discordTranscripts.createTranscript(interaction.channel, {
            limit: -1,
            returnType: 'attachment',
            filename: `${interaction.channel.name} ticket.html`,
            saveImages: true,
            poweredBy: false
        });

        transcriptChannel.send({ files: [attachment] }).catch(() => { });

        setTimeout(() => {
            interaction.channel.delete().catch(() => { });
        }, 5000);
    }
}
