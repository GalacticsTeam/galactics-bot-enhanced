import { ActivityOptions, ActivityType } from 'discord.js';

import { configDotenv } from 'dotenv';

import { BotConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

export const customStatus: ActivityOptions[] = [
  { name: 'Galactics bot', type: ActivityType.Playing },
  { name: 'Developed by gt dev team', type: ActivityType.Watching },
  { name: 'Have fun', type: ActivityType.Watching },
  { name: 'need help? /help', type: ActivityType.Watching },
];

const devModeConfig: BotConfig = {
  allowedFeatures: {
    ping: true,
    blockLinks: true,
    diceRoll: true,
    avatar: true,
    user: true,
    clearChat: true,
    serverInfo: true,
    slowMode: true,
    unlockChannel: true,
  },
  prefixes: ['gt!'],
  serverId: '1086033687109455982',
};

const productionModeConfig: BotConfig = {
  allowedFeatures: {
    ping: true,
    blockLinks: true,
    diceRoll: true,
    avatar: true,
    user: true,
    clearChat: true,
    serverInfo: true,
    slowMode: true,
    unlockChannel: true,
  },
  prefixes: ['gt!'],
  serverId: '673700884617625621',
};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
