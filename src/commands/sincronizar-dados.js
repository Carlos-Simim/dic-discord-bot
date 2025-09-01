const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const puppeteer = require("puppeteer");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sincronizar")
        .setDescription("Sincroniza os dados dos quartos do Habbo."),
    async execute(interaction) {
        const channel = interaction.channel;

        const roomIds = {
            B1: "148212967",
            B2: "149943151",
        };

        const fetchRoomDataWithPuppeteer = async (roomId) => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            try {
                await page.goto(`https://www.habbo.com.br/room/${roomId}`, {
                    waitUntil: "networkidle2",
                });

                const usersNow = await page.evaluate(() => {
                    const element = document.querySelector(".room-header-status-container .room-users-now");
                    return element ? element.innerText.trim() : "0";
                });

                await browser.close();
                return usersNow;
            } catch (error) {
                console.error(`Erro ao buscar dados do quarto ${roomId}:`, error.message);
                await browser.close();
                return "Indisponível";
            }
        };

        const createEmbed = (b1Count, b2Count) => {
            return new EmbedBuilder()
                .setColor(0xff0000) // Vermelho
                .setTitle("Sincronização de Dados efetuada com sucesso")
                .addFields(
                    {
                        name: "🕹️ [Quantidade de pessoas na B1]:",
                        value: `${b1Count} pessoas no quarto!`,
                    },
                    {
                        name: "👾 [Quantidade de pessoas na B2]:",
                        value: `${b2Count} pessoas no quarto!`,
                    }
                )
                .setFooter({ text: "Atualizado automaticamente a cada 1 minuto." })
                .setTimestamp();
        };

        // Envia a mensagem inicial
        let b1Count = "Carregando...";
        let b2Count = "Carregando...";
        const statusMessage = await channel.send({ embeds: [createEmbed(b1Count, b2Count)] });

        // Atualiza os dados a cada 1 minuto
        setInterval(async () => {
            try {
                b1Count = await fetchRoomDataWithPuppeteer(roomIds.B1);
                b2Count = await fetchRoomDataWithPuppeteer(roomIds.B2);

                await statusMessage.edit({ embeds: [createEmbed(b1Count, b2Count)] });
                console.log("Mensagem atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar a mensagem:", error.message);
            }
        }, 60 * 1000);

        await interaction.reply({
            content: "Sincronização iniciada! Acompanhe o status no canal.",
            ephemeral: true, // Apenas o usuário que executou o comando verá esta mensagem
        });
    },
};
