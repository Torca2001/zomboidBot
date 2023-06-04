import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { expandedInteraction } from "./expandedInteraction";

export interface CommandInt {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: expandedInteraction) => Promise<void>;
}