const { registerTextCommands, loadAssets, loadEvents } = require('../configs/utils/botLoad');
const MONGO_URI = process.env.DIC_MONGO_URL;
const { name } = require("../../package.json");
const { connect } = require('mongoose');

const bottom = `\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n\n\x1b[34m┏╋◆ ${name.toUpperCase()} ◆╋┓\n\n`;

module.exports = {
  name: "ready",
  once: true,
  async execute(x, client) {
    console.log(`\x1b[33m[!] ${x.user.tag} logged into Discord!`);

    // Registrar apenas comandos com "data" (slash commands válidos)
    const commands = [...client.commands]
      .filter(([, cmd]) => cmd.data)
      .map(([, cmd]) => cmd.data.toJSON ? cmd.data.toJSON() : cmd.data);

    try {
      await client.application.commands.set(commands);
      console.log(`\x1b[33m[!] [${commands.length}] Slash Commands set.`);
    } catch (err) {
      console.error("\x1b[31m[ERRO] Falha ao registrar comandos slash:", err);
    }

    await registerTextCommands();
    await loadEvents();
    await loadAssets();

    // Lista de atividades
    const activities = [
      { name: "Ariana Grande", type: 2 }, // Ouvindo
      { name: "Beyoncé", type: 2 },      // Ouvindo
      { name: "Rihanna", type: 2 },      // Ouvindo
      { name: "policiadic.com", type: 0 }, // Jogando
    ];

    let i = 0;

    // Alterna as atividades a cada 15 segundos
    setInterval(() => {
      if (i >= activities.length) i = 0;
      const activity = activities[i];
      client.user.setActivity(activity.name, { type: activity.type });
      i++;
    }, 15 * 1000); // 15 Segundos

    await connect(MONGO_URI || "", { keepAlive: true })
      .then(() => console.log("\x1b[32m[!] DataBase status: ONLINE\n\n" + bottom))
      .catch((err) => console.log("\x1b[31mDataBase login err: " + err));
  },
};
