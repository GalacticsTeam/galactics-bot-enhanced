import { configDotenv } from 'dotenv';

import type { DefaultServerConfig, DefaultUserConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

export const defaultServerConfig: DefaultServerConfig = {
  features: {
    serverConfig: true,
    ping: false,
    blockLinks: false,
    diceRoll: false,
    avatar: false,
    user: false,
    clearChat: false,
    serverInfo: false,
  },
  channels: {
    logs: null,
    modLogs: null,
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

const getPropType = <T extends keyof DefaultServerConfig>(propName: T, value: any): DefaultServerConfig[T] =>
  Object.assign({}, ...Object.keys(defaultServerConfig[propName]).map((prop) => ({ [prop]: value })));

export const featuresType = getPropType('features', Boolean);
export const channelsType = getPropType('channels', String || null);
