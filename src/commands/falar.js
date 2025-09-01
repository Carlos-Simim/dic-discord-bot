const { AttachmentBuilder } = require('discord.js');

module.exports = {
  data: {
    name: "falar",
    description: "O bot repete a mensagem enviada ou envia as imagens anexadas.",
  },
  async execute(message, client, input1, args) {
    // perm de adm
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Você precisa ser administrador para usar este comando.");
    }

    const conteudo = args.join(" ");
    const attachments = message.attachments.map(att => att.url); // pegar imagens

    if (!conteudo && attachments.length === 0) {
      return message.reply("Por favor, envie uma mensagem ou anexe imagens.");
    }

    const options = {};
    if (conteudo) options.content = conteudo;
    if (attachments.length > 0) options.files = attachments;

    try {
      await message.channel.send(options);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      return message.reply("Não consegui enviar a mensagem ou imagens.");
    }

    // apaga a msg original após 2 segundos
    setTimeout(() => {
      message.delete().catch(err => console.error("Erro ao apagar a mensagem:", err));
    }, 2000);
  },
};
