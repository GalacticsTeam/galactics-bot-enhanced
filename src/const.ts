import { ActivityType, type ActivityOptions } from 'discord.js';

import type {
  ChannelsConfig,
  DefaultUserConfig,
  EmbedsConfig,
  Feature,
  LocalDBServerConfig,
  PropertiesConfig,
  RolesConfig,
} from './types';

export const notAllowedFeatures: Exclude<Feature, (typeof allowedFeatures)[number]>[] = [
  'ping',
  'blockLinks',
  'diceRoll',
  'avatar',
  'user',
  'clearChat',
  'lockChannel',
  'unlockChannel',
  'slowMode',
  'serverInfo',
  'welcome',
  'autoBan',
  'repeatedWelcomes',
  'modHelp',
  'warn',
  'serverStatus',
  'tempChannels',
  'roleOrganize',
  'maintenance',
  'morseTranslate',
];

export const allowedFeatures = ['serverConfig'] as const satisfies Feature[];

export const channels: ChannelsConfig = [
  'logs',
  'modLogs',
  'welcome',
  'rules',
  'statusCategory',
  'tempChannelCategory',
  'tempChannelGenerator',
  'tempChannelCommands',
];

export const roles: RolesConfig = ['bot', 'member', 'maintenance'];

export const embeds: EmbedsConfig = {
  color: '#000000',
};

export const properties: PropertiesConfig = {
  autoBanTrigger: 5,
  modHelpMessage: 'One of our moderators will help you shortly',
  statuses: [],
};

export const localDB: LocalDBServerConfig = {
  lastJoinedIds: [],
  statusChannels: [],
  tempChannels: [],
};

export const user: DefaultUserConfig = {
  warns: {
    number: 0,
    reasons: [],
  },
};

export const customStatus: ActivityOptions[] = [
  { name: 'Galactics bot', type: ActivityType.Playing },
  { name: 'Developed by gt dev team', type: ActivityType.Watching },
  { name: 'Have fun', type: ActivityType.Watching },
  { name: 'need help? /mod-help', type: ActivityType.Watching },
];
