import { configDotenv } from 'dotenv';

import { BotConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!process.env.DEVMODE ?? false;

const devModeConfig: BotConfig = {
  allowedFeatures: {
    ping: true,
    'roll-dice': true,
    avatar: true,
    user: true,
  },
  prefixes: ['gt!'],
  serverId: '1086033687109455982',
};

const productionModeConfig: BotConfig = {
  allowedFeatures: {
    ping: false,
    'roll-dice': false,
    avatar: false,
    user: false,
  },
  prefixes: ['gt!'],
  serverId: '673700884617625621',
};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
