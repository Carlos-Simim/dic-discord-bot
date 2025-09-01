const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


const modal = new ModalBuilder()
    .setCustomId('justify_activity_modal')
    .setTitle('Painel de justificativas DIC');

const questionInput = new TextInputBuilder()
    .setCustomId('justification')
    .setLabel("Justifique-se aqui.")
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(500)
    .setMinLength(10)
    .setValue("Escreva a sua justificativa")
    .setRequired(true)

const questionRow = new ActionRowBuilder().addComponents(questionInput);

modal.addComponents(questionRow);

this.questionModal = modal
