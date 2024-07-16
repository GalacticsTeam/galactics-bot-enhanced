import { Client, Partials } from 'discord.js';
import { configDotenv } from 'dotenv';

import { crashHandling, isDevMode } from './utils';
import { invokeActions } from './actions';

// =======================================================
// Client Creation
const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent', 'GuildVoiceStates', 'GuildPresences'],
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
client.login(isDevMode ? process.env.BOT_TOKEN_DEV : process.env.BOT_TOKEN_PRODUCTION);
