import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checks the bot\'s response time.');

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
}