import { configDotenv } from 'dotenv';

import { channels, embeds, features, localDB, properties, roles, user } from '../const';

import type { Channels, DefaultServerConfig, DefaultUserConfig, Features, Roles } from '../types';

configDotenv();

export const isDevMode = !!+process.env.DEVMODE! ?? false;
export const localDBPort = isDevMode ? 4000 : 4001;

const getFeatures = (features: (keyof Features)[], isAllowed: boolean = false) =>
  features.reduce((acc, feature) => ({ ...acc, [feature]: isAllowed }), {} as Features);

const getPropType = <T extends keyof DefaultServerConfig>(propName: T, value: unknown): DefaultServerConfig[T] =>
  Object.assign({}, ...Object.keys(defaultServerConfig[propName]).map((prop) => ({ [prop]: value })));

export const defaultServerConfig: DefaultServerConfig = {
  features: { ...getFeatures(features.allowed, true), ...getFeatures(features.notAllowed) },
  channels: channels.reduce((acc, channel) => ({ ...acc, [channel]: null }), {} as Channels),
  roles: roles.reduce((acc, role) => ({ ...acc, [role]: null }), {} as Roles),
  isMaintenance: false,
  isDevServer: isDevMode,
  embeds: embeds,
  properties: properties,
  ...localDB,
};

export const defaultUserConfig: DefaultUserConfig = user;

export const featuresType = getPropType('features', Boolean);
export const channelsType = getPropType('channels', String || null);
export const rolesType = getPropType('roles', String || null);
