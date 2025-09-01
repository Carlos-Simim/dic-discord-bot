const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { status } = require("minecraft-server-util"); // Biblioteca para consultar servidores

let intervalId = null; // Armazena o ID do intervalo para atualizações automáticas

module.exports = {
    data: new SlashCommandBuilder()
        .setName("minecraft-status")
        .setDescription("Exibe o status do servidor com atualizações automáticas."),
    async execute(interaction) {
        // IPs do servidor Minecraft
        const servers = {
            Java: { host: "minecraftdichb.jogar.io", port: 25565 }, // Substitua pelo IP e porta do servidor Java
            Bedrock: { host: "enx-cirion-76.enx.host", port: 10037 }, // Substitua pelo IP e porta do servidor Bedrock
        };

        // Função para buscar o status dos servidores
        const fetchServerStatus = async () => {
            try {
                const javaStatus = await status(servers.Java.host, servers.Java.port, { timeout: 5000 });
                const bedrockStatus = await status(servers.Bedrock.host, servers.Bedrock.port, { timeout: 5000, protocol: "bedrock" });

                return {
                    javaPlayers: `${javaStatus.players.online}/${javaStatus.players.max}`,
                    bedrockPlayers: `${bedrockStatus.players.online}/${bedrockStatus.players.max}`,
                    status: "✅ Online",
                };
            } catch (error) {
                console.error("Erro ao buscar status do servidor:", error.message);
                return {
                    javaPlayers: "Indisponível",
                    bedrockPlayers: "Indisponível",
                    status: "❌ Offline",
                };
            }
        };

        // Função para criar a mensagem de status do servidor
        const createEmbed = async () => {
            const serverStatus = await fetchServerStatus();
            const currentDate = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }); // Data e hora da atualização
            return {
                color: 0x00ff00,
                title: "Status do Servidor Minecraft",
                fields: [
                    { name: "🖥️ IP Java", value: servers.Java.host, inline: true },
                    { name: "📱 IP Bedrock", value: `${servers.Bedrock.host}:${servers.Bedrock.port}`, inline: true },
                    { name: "Java Players Online", value: serverStatus.javaPlayers, inline: true },
                    { name: "Bedrock Players Online", value: serverStatus.bedrockPlayers, inline: true },
                    { name: "Status", value: serverStatus.status, inline: true },
                ],
                footer: {
                    text: `Última atualização pela Ariana Grande: ${currentDate}`,
                },
            };
        };

        // Cria os botões
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Java IP")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://${servers.Java.host}`) // Botão clicável com o IP Java
                .setEmoji("🎮"), // Ícone no botão
            new ButtonBuilder()
                .setLabel("Bedrock IP")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://${servers.Bedrock.host}:${servers.Bedrock.port}`) // Botão clicável com o IP Bedrock
                .setEmoji("📱") // Ícone no botão
        );

        // Envia a mensagem inicial com os botões
        const channel = interaction.channel;
        const statusMessage = await channel.send({
            embeds: [await createEmbed()],
            components: [buttons], // Adiciona os botões abaixo da mensagem
        });

        // Atualiza a mensagem a cada 5 minutos
        if (intervalId) clearInterval(intervalId); // Limpa intervalos anteriores
        intervalId = setInterval(async () => {
            try {
                await statusMessage.edit({ embeds: [await createEmbed()] });
                console.log("Mensagem atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar a mensagem:", error.message);
                clearInterval(intervalId); // Para o intervalo em caso de erro
            }
        }, 5 * 60 * 1000);

        await interaction.reply({
            content: "O status do servidor Minecraft está sendo exibido com botões para os IPs e informações atualizadas!",
            ephemeral: true, // Apenas o usuário que usou o comando vê esta mensagem
        });
    },
};
