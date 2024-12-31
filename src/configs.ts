import type { CheckDuplicates, Embeds, Feature, Properties } from '@types';
import { ActivityType, type ActivityOptions } from 'discord.js';

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
  'preferredLanguage',
  'serverLanguage',
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

const embeds = { color: '#000000' } as const satisfies Embeds;

const properties = {
  autoBanTrigger: 5,
  modHelpMessage: 'One of our moderators will help you shortly',
  statuses: [],
  language: 'en',
} as const satisfies Properties;

const customStatus = [
  { name: 'Galactics bot', type: ActivityType.Playing },
  { name: 'Developed by gt dev team', type: ActivityType.Watching },
  { name: 'Have fun', type: ActivityType.Watching },
  { name: 'need help? /mod-help', type: ActivityType.Watching },
] as const satisfies ActivityOptions[];

export interface Validate {
  notAllowedFeatures: CheckDuplicates<typeof notAllowedFeatures>;
  allowedFeatures: CheckDuplicates<typeof allowedFeatures>;
  channels: CheckDuplicates<typeof channels>;
  roles: CheckDuplicates<typeof roles>;
  customStatus: CheckDuplicates<typeof customStatus>;
  properties: Properties;
  embeds: Embeds;
}

export default {
  notAllowedFeatures,
  allowedFeatures,
  channels,
  roles,
  embeds,
  properties,
  customStatus,
} satisfies Validate;
