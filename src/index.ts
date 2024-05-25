import { Client, Partials } from 'discord.js';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
  partials: [Partials.Message, Partials.Channel],
});

client.login(process.env.BOT_TOKEN);
