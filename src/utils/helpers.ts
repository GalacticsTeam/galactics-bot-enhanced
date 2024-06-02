import { botConfig } from './botConfig';
import { commands } from '../actionHandlers';

import type { InteractionName } from '../actionHandlers/commands/types';
import type { FeatureName } from '../types';

export const isAllowedFeature = <T extends FeatureName>(commandName: T): boolean =>
  botConfig.allowedFeatures[commandName];

export const getCommandIdentifierIndex = (interactionName: InteractionName): number =>
  commands.findIndex((command) => command.name === interactionName);
