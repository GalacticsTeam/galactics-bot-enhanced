import { configDotenv } from 'dotenv';

import configs from '@configs';
import type { Channels, DefaultServerConfig, DefaultUserConfig, Features, Roles } from '@types';

configDotenv();

const { allowedFeatures, channels, notAllowedFeatures, roles, user, localDB } = configs;

export const isDevMode = !!+(process.env.DEVMODE ?? 0);
export const localDBPort = isDevMode ? 4000 : 4001;

const getFeatures = (features: (keyof Features)[], isAllowed: boolean = false) =>
  features.reduce((acc, feature) => ({ ...acc, [feature]: isAllowed }), {} as Features);

const getPropType = <T extends keyof DefaultServerConfig>(propName: T, value: unknown): DefaultServerConfig[T] =>
  Object.assign({}, ...Object.keys(defaultServerConfig[propName]).map((prop) => ({ [prop]: value })));

export const defaultServerConfig: DefaultServerConfig = {
  ...configs,
  ...localDB,
  features: { ...getFeatures(allowedFeatures, true), ...getFeatures(notAllowedFeatures) },
  channels: channels.reduce((acc, channel) => ({ ...acc, [channel]: null }), {} as Channels),
  roles: roles.reduce((acc, role) => ({ ...acc, [role]: null }), {} as Roles),
  isMaintenance: false,
  isDevServer: isDevMode,
};

export const defaultUserConfig: DefaultUserConfig = user;

export const featuresType = getPropType('features', Boolean);
export const channelsType = getPropType('channels', String || null);
export const rolesType = getPropType('roles', String || null);
