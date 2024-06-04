import { ColorResolvable } from 'discord.js';

import type { InteractionIdentifier } from './actionHandlers/commands/types';
import type { Prefix } from './actionHandlers/prefixes/types';

export type Feature = 'ping' | 'blockLinks' | InteractionIdentifier;

export type ID = string;

export type FeaturesSchema = {
  [t in Feature]: BooleanConstructor;
};

export type Features = {
  [t in Feature]: boolean;
};

export type FeatureName = keyof FeaturesSchema;

export interface DefaultServerConfig {
  features: Features;
  prefixes: Prefix[];
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: {
    color: ColorResolvable;
  };
}

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}
