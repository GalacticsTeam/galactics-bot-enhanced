import { configDotenv } from 'dotenv';

import { BotConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!process.env.DEVMODE ?? false;

const devModeConfig: BotConfig = {};

const productionModeConfig: BotConfig = {};

export const botConfig: BotConfig = isDevMode ? devModeConfig : productionModeConfig;
