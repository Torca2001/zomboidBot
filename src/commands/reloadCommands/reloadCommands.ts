import { SlashCommandBuilder } from 'discord.js';
import { CommandInt } from '../../command';
import { expandedInteraction } from '../../expandedInteraction';

export const data = new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption(option =>
        option.setName("command")
            .setDescription("The command to reload.")
            .setRequired(true)
    );

export async function run(interaction: expandedInteraction) {
    let value = interaction.options.get('command', true).value;
    if (typeof value === 'string') {
        value = value.toLowerCase();

        const command = interaction.client.commands.get(value);
        if (!command) {
            interaction.reply(`There is no command with name \`${value}\`!`);
            return;
        } else {
            let commandPath = `../../commands/${command.data.name}/${command.data.name}.js`;
            delete require.cache[require.resolve(commandPath)];

            try {
                interaction.client.commands.delete(command.data.name);
                const newCommand = require(commandPath);

                interaction.client.commands.set(newCommand.data.name, newCommand);
                console.log(`Command \`${newCommand.data.name}\` was reloaded!`);
                console.log(interaction.client.commands.size);
                await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
            }
        }
    }
}
