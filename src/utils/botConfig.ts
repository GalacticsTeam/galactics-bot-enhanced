import { configDotenv } from 'dotenv';

configDotenv();

export const isDevMode = !!+(process.env.DEVMODE ?? 0);
export const localDBPort = isDevMode ? 4000 : 4001;
