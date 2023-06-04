import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { expandedClient } from './expandedClient';

export class expandedInteraction extends ChatInputCommandInteraction{
    public client: expandedClient;
}