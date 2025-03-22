import { GatewayIntentBits } from "discord.js";

import { Client } from "./app/client.js";
import config from "./app/config.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Map();

client.init(config.DISCORD_TOKEN);
