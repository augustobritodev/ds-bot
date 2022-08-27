const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const commands = [];

const rest = new REST({
  version: '10',
}).setToken(process.env.TOKEN);


rest.put(Routes.applicationGuildCommands(
  process.env.CLIENT_ID,
  process.env.GUILD_ID),
  { body: commands },
)
  .then(() => console.log('Successfully registered bot commands.'))
  .catch(console.error);