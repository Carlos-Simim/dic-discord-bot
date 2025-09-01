const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

// ids canal logs atividades e justificativas
const CANAL_ATIVIDADES_ID = "1236927417487200306";
const CANAL_JUSTIFICATIVAS_ID = "1236927515558154340";

module.exports = {
  name: "setaratividades",
  description: "Configura os canais de atividades e justificativas (embed + botões + thumbnail)",
  async execute(message, client) {
    // icone do servidor
    const guildIcon = message.guild.iconURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle("⚙️ ATIVIDADES DIRETORIA DE COMUNICAÇÕES ® ⚙️")
      .setDescription("Utilize os botões abaixo para declarar a **realização das atividades, ou justificar** o motivo de não realizar.")
      .setColor("Blue")
      .setThumbnail(guildIcon)
      .setTimestamp();

    const botoes = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`atividade_${CANAL_ATIVIDADES_ID}`)
          .setLabel("ATIVIDADE REALIZADA")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`justificar_${CANAL_JUSTIFICATIVAS_ID}`)
          .setLabel("JUSTIFICAR")
          .setStyle(ButtonStyle.Danger)
      );

    await message.channel.send({
      embeds: [embed],
      components: [botoes],
    });

    return message.reply({ content: "Sistema de atividades configurado com sucesso!", ephemeral: true });
  }
};
