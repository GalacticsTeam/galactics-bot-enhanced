import type { ColorResolvable } from 'discord.js';

import type { TempChannel } from './actionHandlers/';
import type { InteractionIdentifier } from './actionHandlers/commands/types';
import type { Status, StatusChannel } from './actionHandlers/onServerStatus/types';

export type Feature =
  | 'ping'
  | 'blockLinks'
  | 'welcome'
  | 'autoBan'
  | 'repeatedWelcomes'
  | 'serverStatus'
  | 'tempChannels'
  | 'roleOrganize'
  | 'customStatus'
  | InteractionIdentifier;
export type Channel =
  | 'logs'
  | 'modLogs'
  | 'welcome'
  | 'rules'
  | 'statusCategory'
  | 'tempChannelCategory'
  | 'tempChannelGenerator'
  | 'tempChannelCommands';
export type Role = 'bot' | 'member';
export type Embed = keyof DefaultServerConfig['embeds'];
export type Property = keyof DefaultServerConfig['properties'];

type Features = { [t in Feature]: boolean };
type Channels = { [t in Channel]: string | null };
type Roles = { [t in Role]: string | null };

export interface LocalDBServerConfig {
  lastJoinedIds: string[];
  statusChannels: StatusChannel[];
  tempChannels: TempChannel[];
}

export interface DefaultServerConfig extends LocalDBServerConfig {
  features: Features;
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: { color: ColorResolvable };
  channels: Channels;
  roles: Roles;
  properties: { autoBanTrigger: number; modHelpMessage: string; statuses: Status[] };
}

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}
