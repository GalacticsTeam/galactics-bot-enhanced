import type { ColorResolvable } from 'discord.js';

import type { TempChannel } from '@actionHandlers';
import type { InteractionIdentifier } from '@commands/types';
import type { Status, StatusChannel } from '@actionHandlers/onServerStatus/types';

export type Feature =
  | 'ping'
  | 'blockLinks'
  | 'welcome'
  | 'autoBan'
  | 'repeatedWelcomes'
  | 'serverStatus'
  | 'tempChannels'
  | 'roleOrganize'
  | InteractionIdentifier;

export type Embed = keyof Embeds;
export type Property = keyof Properties;

export type Features = Record<Feature, boolean>;
export type Channels = Record<Channel, string | null>;
export type Roles = Record<Role, string | null>;
export interface Embeds {
  color: ColorResolvable;
}
export interface Properties {
  autoBanTrigger: number;
  modHelpMessage: string;
  statuses: Status[];
}

export interface LocalDBServerConfig {
  lastJoinedIds: string[];
  statusChannels: StatusChannel[];
  tempChannels: TempChannel[];
}

export interface DefaultServerConfig extends LocalDBServerConfig {
  features: Features;
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: Embeds;
  channels: Channels;
  roles: Roles;
  properties: Properties;
}

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}

export type CheckDuplicates<T extends unknown[], U extends unknown[] = []> = T extends [infer F, ...infer R]
  ? F extends U[number]
    ? CheckDuplicates<R, U>
    : CheckDuplicates<R, [...U, F]>
  : U;
