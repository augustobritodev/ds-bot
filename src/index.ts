const fs = require('node:fs');
const path = require('path');
const {
  Client,
  GatewayIntentBits,
  Collection,
  Routes,
} = require('discord.js');
const { REST } = require('@discordjs/rest');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

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

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.log(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }

});

client.login(process.env.TOKEN);