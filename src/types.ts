import { ColorResolvable } from 'discord.js';

import type { InteractionIdentifier } from './actionHandlers/commands/types';

export type Feature = 'ping' | 'blockLinks' | 'welcome' | 'autoBan' | InteractionIdentifier;
export type Channel = 'logs' | 'modLogs' | 'welcome' | 'rules';
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
  properties: { autoBanTrigger: number };
}

export interface LocalDBServerConfig {
  lastJoinedIds: string[];
}

export type ServerConfigItem = keyof DefaultServerConfig;

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}
