const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("atvdestag")
    .setDescription("Declaração de atividade de estágio."),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("📋 Declaração de Atividade")
      .setDescription("Utilize o botão abaixo para poder declarar a sua atividade.")
      .setColor(0x2f3136)
      .setImage(interaction.guild.iconURL({ size: 512 }));

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("abrir_modal_atvd")
        .setLabel("ATVD REALIZADA")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
