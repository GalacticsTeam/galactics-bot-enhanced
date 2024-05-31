import { commands } from '../actionHandlers';

import type { InteractionIdentifier, InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName, ID } from '../types';
import { getServerSchema } from '../db';

export const isAllowedFeature = <T extends FeatureName>(commandName: T, serverId: string) =>
  getServerSchema(serverId as ID).then((server) => server.features[commandName]);

export const getCommandIdentifier = (interactionName: InteractionName): InteractionIdentifier =>
  Object.keys(commands).filter(
    (commandIdentifier) => commands[commandIdentifier as InteractionIdentifier].name === interactionName
  )[0] as InteractionIdentifier;
