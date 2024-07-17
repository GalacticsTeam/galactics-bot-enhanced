import { commands } from '../actionHandlers';

import type { InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName, ID } from '../types';
import { getServerItem } from '../db';

export const isAllowedFeature = <T extends FeatureName>(feature: T, serverId: string) =>
  getServerItem(serverId as ID, 'features').then((features) => features[feature]);

export const getCommandIdentifierIndex = (interactionName: InteractionName): number =>
  commands.findIndex((command) => command.name === interactionName);

export const getDifference = <T extends any[]>(arr1: T, arr2: T): T => arr1.filter((x) => !arr2.includes(x)) as T;
