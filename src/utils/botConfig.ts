import { configDotenv } from 'dotenv';

import { BotConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

const devModeConfig: BotConfig = {
  allowedFeatures: {
    ping: true,
    blockLinks: true,
    diceRoll: true,
    avatar: true,
    user: true,
    clearChat: true,
    serverInfo: true,
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
  },
  prefixes: ['gt!'],
  serverId: '673700884617625621',
};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
