const { 
  Client, 
  Collection, 
  IntentsBitField, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  Events 
} = require("discord.js");
const { prefix } = require("../config.json");
const token = process.env.DIC_TOKEN;
console.log(token);

const { readdirSync } = require("fs");

// ---------------------- CLIENTE ----------------------
const myIntents = new IntentsBitField().add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildPresences // necessário para status online/idle/dnd
);

const client = new Client({ intents: myIntents });

client.prefix = prefix;
client.commands = new Collection();

// ---------------------- COMANDOS ----------------------
const commandFiles = [];
(function findCommands(path = "commands") {
  readdirSync(`./src/${path}`).forEach(file => {
    if (file === "aliases" || file.startsWith('_')) return;
    if (file.endsWith(".js")) {
      commandFiles.push(file);
    } else {
      findCommands(path + `/${file}`);
    }
  });
})();

for (const file of commandFiles) {
  let commander;
  const getCommands = (name, path = "commands") => {
    const dirr = `./src/${path}`;
    readdirSync(dirr).forEach(find => {
      if (find === name) {
        commander = `./${path}/${find}`;
      } else {
        if (find.endsWith(".js")) return;
        if (find === "aliases" || find.startsWith("_")) return;
        getCommands(name, path + `/${find}`);
      }
    });
  };
  getCommands(file);

  const command = require(commander);
  client.commands.set(
    command.name === undefined ? command.data.name : command.name,
    command
  );
}

// ---------------------- EVENTOS ----------------------
const eventFiles = readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, data => event.execute(data, client));
}

// ---------------------- IDS ----------------------
const ORIGEM_SERVIDOR_ID = "1282091983132692510";
const ORIGEM_CANAL_ID = "1282091983640203375";
const DESTINO_SERVIDOR_ID = "1236925831004164136";
const REACAO_DESTINO_CANAL_ID = "1325657296906485781"; 
const LISTA_ESPERA_DESTINO_CANAL_ID = "1383592357928112311"; 

// ---------------------- TRANSPORTE POR REAÇÃO ----------------------
client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;

  try {
    if (reaction.partial) await reaction.fetch();
    const { message } = reaction;
    if (message.guild.id !== ORIGEM_SERVIDOR_ID || message.channel.id !== ORIGEM_CANAL_ID) return;

    const servidorDestino = await client.guilds.fetch(DESTINO_SERVIDOR_ID);
    const canalDestino = await servidorDestino.channels.fetch(REACAO_DESTINO_CANAL_ID);
    if (!canalDestino.isTextBased()) return;

    const conteudoMensagem = `📌 **Mensagem transportada por reação**\n\n**Autor da mensagem:** ${message.author.tag}\n**Quem reagiu:** ${user.tag}\n**Canal Original:** <#${message.channel.id}>\n\n${message.content || "*Sem texto*"}\n\n[🔗 Link para a mensagem](${message.url})`;

    await canalDestino.send({ content: conteudoMensagem });
    console.log("Mensagem transportada com sucesso!");
  } catch (error) {
    console.error("Erro ao transportar a mensagem:", error);
  }
});

// ---------------------- INTERAÇÕES DO BOTÃO + MODAL ----------------------
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton() && interaction.customId === 'entrar_lista_espera') {
    const modal = new ModalBuilder()
      .setCustomId('modal_lista_espera')
      .setTitle('Entrar na Lista de Espera - Comunicações')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('patente_nick')
            .setLabel('Sua patente + nick')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('motivo')
            .setLabel('Por que deseja entrar na DC?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(45)
        )
      );
    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'modal_lista_espera') {
    const patenteNick = interaction.fields.getTextInputValue('patente_nick');
    const motivo = interaction.fields.getTextInputValue('motivo');

    const embed = new EmbedBuilder()
      .setTitle('📨 Nova inscrição na Lista de Espera — Comunicações')
      .addFields(
        { name: '👤 Patente + Nick', value: patenteNick },
        { name: '📝 Motivo', value: motivo }
      )
      .setColor('#5865F2')
      .setTimestamp();

    try {
      const destinoGuild = await client.guilds.fetch(DESTINO_SERVIDOR_ID);
      const destinoChannel = await destinoGuild.channels.fetch(LISTA_ESPERA_DESTINO_CANAL_ID);
      if (destinoChannel && destinoChannel.isTextBased()) await destinoChannel.send({ embeds: [embed] });

      await interaction.reply({ content: '✅ Sua solicitação foi enviada com sucesso!', ephemeral: true });
    } catch (err) {
      console.error("Erro ao enviar inscrição:", err);
      await interaction.reply({ content: '❌ Ocorreu um erro ao enviar sua solicitação.', ephemeral: true });
    }
  }
});

// ---------------------- MONITORAMENTO DA ORDEM DOS CANAIS ----------------------
const SERVIDOR_MONITORADO = "1282091983132692510";
const SERVIDOR_LOGS = "1236925831004164136";
const CANAL_LOGS = "1236927157041762395";
const INTERVALO_MS = 5000;

const CARGOS_MONITORADOS = [
  "1282091983300726901",
  "1282091983300726896",
  "1282091983313174701",
  "1282091983300726905",
  "1292913644434362369",
  "1282091983292334099",
  "1282091983279624330",
  "1282091983292334091"
];

let ultimaOrdem = [];

async function monitorarOrdem() {
  try {
    const guild = await client.guilds.fetch(SERVIDOR_MONITORADO);
    if (!guild) return;

    // fetch completo de membros para garantir que os status estão disponíveis
    await guild.members.fetch();

    const canais = guild.channels.cache
      .filter(c => c.type === 0 || c.type === 2 || c.type === 4)
      .sort((a, b) => a.rawPosition - b.rawPosition)
      .map(c => c.id);

    if (ultimaOrdem.length === 0) {
      ultimaOrdem = canais;
      return;
    }

    if (JSON.stringify(canais) !== JSON.stringify(ultimaOrdem)) {
      const guildLogs = await client.guilds.fetch(SERVIDOR_LOGS);
      if (!guildLogs) return;

      const canalLogs = await guildLogs.channels.fetch(CANAL_LOGS);
      if (!canalLogs || !canalLogs.isTextBased()) return;

      const membrosAtivos = guild.members.cache.filter(
        m => 
          m.roles.cache.some(role => CARGOS_MONITORADOS.includes(role.id)) &&
          m.presence?.status && m.presence.status !== "offline"
      );

      const mencoes = membrosAtivos.map(m => `<@${m.id}>`).join(" ");

      await canalLogs.send(
        `⚠️ Detectada mudança na ordem dos canais no servidor ${guild.name} (${SERVIDOR_MONITORADO})\n${mencoes || "Nenhum responsável ativo no momento."}`
      );

      ultimaOrdem = canais;
    }
  } catch (error) {
    console.error("Erro ao monitorar ordem dos canais:", error);
  }
}

setInterval(monitorarOrdem, INTERVALO_MS);

// ---------------------- LOGIN ----------------------
client.login(token)
  .then(() => {
    const { name } = require('../package.json');
    const top = `\x1b[34m┏╋◆ ${name.toUpperCase()} ◆╋┓\n\n\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓`;
    console.log('\n' + top + "\n\n\x1b[32m[!] Bot Status: ONLINE"); //its luquinhas babyyyyyyyyy
    module.exports = { client };
  })
  .catch(err => {
    console.log("\x1b[31mBot login err: " + err);
  });
