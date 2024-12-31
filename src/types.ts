import type { ColorResolvable } from 'discord.js';

import type { TempChannel } from '@actionHandlers';
import type { InteractionIdentifier } from '@commands/types';
import type { Status, StatusChannel } from '@actionHandlers/onServerStatus/types';
import type { Warns } from '@db/schemas';

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
  language: Language;
}

export interface LocalDBServerConfig {
  lastJoinedIds: string[];
  statusChannels: StatusChannel[];
  tempChannels: TempChannel[];
}

export interface ServerConfig {
  features: Features;
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: Embeds;
  channels: Channels;
  roles: Roles;
  properties: Properties;
}

export interface UserConfig {
  language: Language;
  birthday: string | null;
}

export interface ServerUserConfig {
  warns: Warns;
}

export type CheckDuplicates<T extends unknown[], U extends unknown[] = []> = T extends [infer F, ...infer R]
  ? F extends U[number]
    ? CheckDuplicates<R, U>
    : CheckDuplicates<R, [...U, F]>
  : U;
