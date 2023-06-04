import { Client, ClientOptions } from "discord.js";
import { CommandInt } from "./command";

export class expandedClient extends Client {
    commands : Map<string, CommandInt>;
    
    constructor(options : ClientOptions) {
        super(options);
        this.commands = new Map<string, CommandInt>();
    }
}
