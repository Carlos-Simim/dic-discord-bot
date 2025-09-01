const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    name: "sejastaff",
    async execute(message) {
        const embed = new EmbedBuilder()
            .setTitle('📢 LISTA DE ESPERA ABERTA — DIRETORIA DE COMUNICAÇÕES 📢')
            .setDescription(
                'A Diretoria de Comunicações informa que a **lista de espera** está **aberta** para quem deseja fazer parte da equipe!\n\n' +
                '🎯 **Requisitos para se candidatar:**\n' +
                '• Ser **Subtenente ou equivalente com o curso+**;\n' +
                '• Ter **vontade de aprender** e se dedicar às atividades da diretoria;\n' +
                '• **Noções de Discord** são **bem-vindas**, mas **não obrigatórias**.\n\n' +
                'Se você se identifica com o perfil e deseja contribuir com o setor, **manifeste seu interesse** clicando no botão abaixo e preenchendo as informações.\n\n' +
                'Contamos com você! 💻📡'
            )
            .setColor('#2f3136');

        const botao = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('entrar_lista_espera')
                .setLabel('ENTRAR NA LISTA DE ESPERA')
                .setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ embeds: [embed], components: [botao] });
    }
};
