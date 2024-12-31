import configs from '@configs';
import { isDevMode } from '@utils/botConfig';
import type { Channels, Feature, Features, Roles, ServerConfig, ServerUserConfig, UserConfig } from '@types';

const getFeaturesObj = (features: Feature[], isAllowed: boolean = false) =>
  features.reduce((acc, feature) => {
    acc[feature] = isAllowed;
    return acc;
  }, {} as Features);

const user: UserConfig = { language: 'en' };

const serverUser: ServerUserConfig = { warns: { number: 0, reasons: [] } };

const server: ServerConfig = {
  embeds: configs.embeds,
  properties: configs.properties,
  features: { ...getFeaturesObj(configs.allowedFeatures, true), ...getFeaturesObj(configs.notAllowedFeatures) },
  channels: configs.channels.reduce((acc, channel) => ({ ...acc, [channel]: null }), {} as Channels),
  roles: configs.roles.reduce((acc, role) => ({ ...acc, [role]: null }), {} as Roles),
  isMaintenance: false,
  isDevServer: isDevMode,
};

export default {
  user,
  serverUser,
  server,
};
