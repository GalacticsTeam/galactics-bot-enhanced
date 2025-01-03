import type { Guild, Role as GuildRole } from 'discord.js';

import { commands } from '@commands';
import { getServerProperty } from '@db';
import type { InteractionIdentifier, InteractionName } from '@commands/types';
import type { Feature, Embed, Property } from '@types';

export const isFeatureAllowed = <T extends Feature>(feature: T, serverId: string) =>
  getServerProperty(serverId, 'features').then((features) => features[feature]);

export const getCommandIdentifierIndex = (interactionName: InteractionName): number =>
  commands.findIndex((command) => command.name === interactionName);

export const getCommandTypeIndex = (interactionType: InteractionIdentifier): number =>
  commands.findIndex((command) => command.type === interactionType);

export const getDifference = <T extends unknown[]>(arr1: T, arr2: T): T => arr1.filter((x) => !arr2.includes(x)) as T;

export const getChannel = async <T extends Channel>(guild: Guild, channel: T) =>
  guild.channels.cache.get((await getServerProperty(guild.id, 'channels'))[channel]!);

export const getRole = async <T extends Role>(guild: Guild, role: T) =>
  guild.roles.cache.get((await getServerProperty(guild.id, 'roles'))[role]!);

export const getEmbed = async <T extends Embed>(serverId: string, embed: T) =>
  (await getServerProperty(serverId, 'embeds'))[embed];

export const getProperty = async <T extends Property>(serverId: string, property: T) =>
  (await getServerProperty(serverId, 'properties'))[property];

export const checkItemType = (item: unknown) => {
  const isArray = Array.isArray(item);
  const isObj = typeof item === 'object' && item !== null;

  return {
    isArray,
    isObj,
    isString: !isArray && !isObj,
  };
};

export const getIsRoleSeparator = (role: GuildRole) => role.name.startsWith('⠀⠀') && role.name.endsWith('⠀⠀');

export const getRoleSeparators = (guild: Guild) =>
  guild.roles.cache.filter(getIsRoleSeparator).sort((a, b) => a.position - b.position);

export const getRolesWithoutSeparators = (roles: GuildRole[]) =>
  roles.filter((role) => !getIsRoleSeparator(role)).sort((a, b) => b.position - a.position);
