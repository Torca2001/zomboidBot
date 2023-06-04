import { SlashCommandBuilder } from 'discord.js';
import { expandedInteraction } from '../../expandedInteraction';
import { CommandInt } from '../../command';

export const data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("test yes");

export async function run(interaction: expandedInteraction) {
    await interaction.reply("test");
}