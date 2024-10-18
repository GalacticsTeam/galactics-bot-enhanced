import { ActivityType, type ActivityOptions } from 'discord.js';

import type {
  Channel,
  CheckDuplicates,
  DefaultUserConfig,
  Embeds,
  Feature,
  LocalDBServerConfig,
  Properties,
  Role,
} from '@types';

const allowedFeatures = ['serverConfig'] as const satisfies Feature[];

const notAllowedFeatures = [
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
] as const satisfies Exclude<Feature, (typeof allowedFeatures)[number]>[];

const channels = [
  'logs',
  'modLogs',
  'welcome',
  'rules',
  'statusCategory',
  'tempChannelCategory',
  'tempChannelGenerator',
  'tempChannelCommands',
] as const satisfies Channel[];

const roles = ['bot', 'member', 'maintenance', 'lowestAuthorizedRole'] as const satisfies Role[];

const embeds = {
  color: '#000000',
} as const satisfies Embeds;

const properties = {
  autoBanTrigger: 5,
  modHelpMessage: 'One of our moderators will help you shortly',
  statuses: [],
} as const satisfies Properties;

const localDB = {
  lastJoinedIds: [],
  statusChannels: [],
  tempChannels: [],
} as const satisfies LocalDBServerConfig;

const user = {
  warns: {
    number: 0,
    reasons: [],
  },
} as const satisfies DefaultUserConfig;

const customStatus = [
  { name: 'Galactics bot', type: ActivityType.Playing },
  { name: 'Developed by gt dev team', type: ActivityType.Watching },
  { name: 'Have fun', type: ActivityType.Watching },
  { name: 'need help? /mod-help', type: ActivityType.Watching },
] as const satisfies ActivityOptions[];

interface Configs {
  notAllowedFeatures: CheckDuplicates<typeof notAllowedFeatures>;
  allowedFeatures: CheckDuplicates<typeof allowedFeatures>;
  channels: CheckDuplicates<typeof channels>;
  roles: CheckDuplicates<typeof roles>;
  embeds: Embeds;
  properties: Properties;
  localDB: LocalDBServerConfig;
  user: DefaultUserConfig;
  customStatus: CheckDuplicates<typeof customStatus>;
}

const configs: Configs = {
  notAllowedFeatures,
  allowedFeatures,
  channels,
  roles,
  embeds,
  properties,
  localDB,
  user,
  customStatus,
};

export default configs;
