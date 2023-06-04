import { REST, Routes } from 'discord.js';
import { botToken } from './config.json';
import { CommandInt } from './command';
import * as fs from 'fs';
import * as path from 'path';

export function getCommands(): Map<string, CommandInt> {
    let commands = new Map<string, CommandInt>();

    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            let commandType = require(filePath);
            
            if ('data' in commandType && 'run' in commandType) {
                commands.set(commandType.data.name, commandType);
            }
        }
    }

    return commands;
}

export function registerCommands(clientId: string, commands : Map<string, CommandInt>) {

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(botToken);

    console.log(`Registering interaction commands for ${clientId}, ${commands.size} commands found.`);

    rest.put(
        Routes.applicationCommands(clientId),
        { body: Array.from(commands.values()).map(command => command.data.toJSON()) },
    );
}


