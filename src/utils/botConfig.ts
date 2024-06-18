import { configDotenv } from 'dotenv';

import { DefaultServerConfig, DefaultUserConfig, Features } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

export const defaultServerConfig: DefaultServerConfig = {
  features: {
    ping: false,
    blockLinks: false,
    diceRoll: false,
    avatar: false,
    user: false,
    clearChat: false,
    serverInfo: false,
  },
  isMaintenance: false,
  isDevServer: isDevMode,
  embeds: {
    color: '#000000',
  },
};

export const defaultUserConfig: DefaultUserConfig = {
  warns: {
    number: 0,
    reasons: [],
  },
};

export const features: Features = Object.assign(
  {},
  ...Object.keys(defaultServerConfig.features).map((feature) => ({ [feature]: Boolean }))
);
