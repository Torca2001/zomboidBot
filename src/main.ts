import { Client, GatewayDispatchEvents, GatewayIntentBits, Events, SlashCommandBuilder, CommandInteraction, Interaction, ClientOptions } from "discord.js";
import { botToken } from "./config.json";
import { registerCommands, getCommands } from "./registerCommands";
import { expandedClient } from "./expandedClient";
import { expandedInteraction } from "./expandedInteraction";

console.log("Bot is starting...");

const client : expandedClient  = new expandedClient({
    intents: []
});
client.commands = getCommands();

client.once("ready", () => {
    console.log(`Connected as ${client.user?.username} - ${client.user?.id}`);

    if (client.user?.id) {
        registerCommands(client.user?.id ?? "", client.commands);
    }
});

client.on(Events.InteractionCreate, (interaction : Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        command.run(interaction as expandedInteraction);
    }
    catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});

client.login(botToken);


