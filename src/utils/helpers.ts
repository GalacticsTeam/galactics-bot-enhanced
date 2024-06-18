import { commands } from '../actionHandlers';

import type { InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName, ID } from '../types';
import { getServerItem } from '../db';

export const isAllowedFeature = <T extends FeatureName>(commandName: T, serverId: string) =>
  getServerItem(serverId as ID, 'features').then((features) => features[commandName]);

export const getCommandIdentifierIndex = (interactionName: InteractionName): number =>
  commands.findIndex((command) => command.name === interactionName);
