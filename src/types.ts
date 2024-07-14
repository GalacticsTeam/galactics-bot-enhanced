import { ColorResolvable } from 'discord.js';

import type { InteractionIdentifier } from './actionHandlers/commands/types';
import type { Status, StatusChannel } from './actionHandlers/onServerStatus/types';

export type Feature =
  | 'ping'
  | 'blockLinks'
  | 'welcome'
  | 'autoBan'
  | 'repeatedWelcomes'
  | 'serverStatus'
  | InteractionIdentifier;
export type Channel = 'logs' | 'modLogs' | 'welcome' | 'rules' | 'statusCategory';
export type Role = 'bot' | 'member';
export type Embed = keyof DefaultServerConfig['embeds'];
export type Property = keyof DefaultServerConfig['properties'];

export type ID = string;

export type FeaturesSchema = { [t in Feature]: BooleanConstructor };

export type Features = { [t in Feature]: boolean };
export type Channels = { [t in Channel]: string | null };
export type Roles = { [t in Role]: string | null };

export type FeatureName = keyof FeaturesSchema;

export interface DefaultServerConfig extends LocalDBServerConfig {
  features: Features;
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: { color: ColorResolvable };
  channels: Channels;
  roles: Roles;
  properties: { autoBanTrigger: number; modHelpMessage: string; statuses: Status[] };
}

export interface LocalDBServerConfig {
  lastJoinedIds: string[];
  statusChannels: StatusChannel[];
}

export type ServerConfigItem = keyof DefaultServerConfig;

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}
