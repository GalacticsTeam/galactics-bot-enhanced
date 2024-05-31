import { botConfig } from './botConfig';
import { commands } from '../actionHandlers';

import type { InteractionIdentifier, InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName } from '../types';

export const isAllowedFeature = <T extends FeatureName>(commandName: T): boolean =>
  botConfig.allowedFeatures[commandName];

export const getCommandIdentifier = (interactionName: InteractionName): InteractionIdentifier =>
  Object.keys(commands).filter(
    (commandIdentifier) => commands[commandIdentifier as InteractionIdentifier].name === interactionName
  )[0] as InteractionIdentifier;
