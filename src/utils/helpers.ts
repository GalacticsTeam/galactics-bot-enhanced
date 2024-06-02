import { commands } from '../actionHandlers';

import { getServerItem } from '../db';

import type { InteractionIdentifier, InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName, ID } from '../types';

export const isAllowedFeature = <T extends FeatureName>(commandName: T, serverId: string) =>
  getServerItem(serverId as ID, 'features').then((features) => features[commandName]);

export const getCommandIdentifier = (interactionName: InteractionName): InteractionIdentifier =>
  Object.keys(commands).filter(
    (commandIdentifier) => commands[commandIdentifier as InteractionIdentifier].name === interactionName
  )[0] as InteractionIdentifier;
