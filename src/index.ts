import { Client, Partials } from 'discord.js';
import { configDotenv } from 'dotenv';

import { crashHandling } from './utils';
import { invokeActions } from './actions';

// =======================================================
// Client Creation
const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
  partials: [Partials.Message, Partials.Channel],
});

// =======================================================
// Configurations
configDotenv();
crashHandling();

// =======================================================
// Actions Invoker
invokeActions(client);

// =======================================================
// Client initialization
client.login(process.env.BOT_TOKEN);
