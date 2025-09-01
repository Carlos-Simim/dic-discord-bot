const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

// Função para data/hora de Brasília
function dataHoraBrasilia() {
  const data = new Date();
  const utc3 = new Date(data.getTime() - 3 * 60 * 60 * 1000); // UTC-3

  const dia = String(utc3.getDate()).padStart(2, '0');
  const mes = String(utc3.getMonth() + 1).padStart(2, '0');
  const ano = utc3.getFullYear();
  const hora = String(utc3.getHours()).padStart(2, '0');
  const min = String(utc3.getMinutes()).padStart(2, '0');
  const seg = String(utc3.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${min}:${seg}`;
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      const canalID = interaction.customId.split("_")[1];

      // Botão "Atividade Realizada"
      if (interaction.customId.startsWith("atividade_")) {
        const modal = new ModalBuilder()
          .setCustomId(`modal_atividade_${canalID}_${interaction.user.id}`)
          .setTitle("Atividade Realizada");

        const nick = new TextInputBuilder()
          .setCustomId("nick")
          .setLabel("Seu nick")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const grupo = new TextInputBuilder()
          .setCustomId("grupo")
          .setLabel("Grupo/div conferido")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const nicksMilitares = new TextInputBuilder()
          .setCustomId("nicksMilitares")
          .setLabel("Nick dos militares")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(nick),
          new ActionRowBuilder().addComponents(grupo),
          new ActionRowBuilder().addComponents(nicksMilitares)
        );

        return interaction.showModal(modal);
      }

      // Botão "Justificar"
      if (interaction.customId.startsWith("justificar_")) {
        const modal = new ModalBuilder()
          .setCustomId(`modal_justificativa_${canalID}_${interaction.user.id}`)
          .setTitle("Justificativa");

        const justificativa = new TextInputBuilder()
          .setCustomId("justificativa")
          .setLabel("Justifique-se")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(justificativa));

        return interaction.showModal(modal);
      }
    }

    // ---- Submissão de modais ----
    if (interaction.isModalSubmit()) {
      const customId = interaction.customId;
      const partes = customId.split("_");
      const canalID = partes[2];

      const canal = await client.channels.fetch(canalID).catch(() => null);
      if (!canal) return interaction.reply({ content: "Não consegui acessar o canal.", ephemeral: true });

      // Modal de Atividade
      if (customId.startsWith("modal_atividade_")) {
        const nick = interaction.fields.getTextInputValue("nick");
        const grupo = interaction.fields.getTextInputValue("grupo");
        const nicksMilitares = interaction.fields.getTextInputValue("nicksMilitares");

        const embed = new EmbedBuilder()
          .setTitle("✅ Atividade Realizada")
          .addFields(
            { name: "Solicitante", value: interaction.user.tag },
            { name: "Nick", value: nick },
            { name: "Grupo/Div", value: grupo },
            { name: "Nick dos militares", value: nicksMilitares },
            { name: "Data/Hora", value: dataHoraBrasilia() }
          )
          .setColor("Green");

        await canal.send({ embeds: [embed] });
        return interaction.reply({ content: "Atividade registrada com sucesso!", ephemeral: true });
      }

      // Modal de Justificativa
      if (customId.startsWith("modal_justificativa_")) {
        const justificativa = interaction.fields.getTextInputValue("justificativa");

        const embed = new EmbedBuilder()
          .setTitle("⚠️ Justificativa")
          .addFields(
            { name: "Solicitante", value: interaction.user.tag },
            { name: "Justificativa", value: justificativa },
            { name: "Data/Hora", value: dataHoraBrasilia() }
          )
          .setColor("Red");

        await canal.send({ embeds: [embed] });
        return interaction.reply({ content: "Justificativa enviada com sucesso!", ephemeral: true });
      }
    }
  },
};
