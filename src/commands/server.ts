const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info.'),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.guild.name}\n Members: ${interaction.guild.memberCount}`,
    );
  },
};