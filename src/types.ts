import { InteractionIdentifier } from './actionHandlers/commands/types';

export type Prefix = 'gt!';

export type Feature = 'ping' | 'blockLinks' | InteractionIdentifier;

export type ID = `${number}`;

export type Features = {
  [t in Feature]: BooleanConstructor;
};

export type DefaultFeatures = {
  [t in Feature]: boolean;
};

export type FeatureName = keyof Features;

export type BotConfig = {
  features: DefaultFeatures;
  prefixes: Prefix[];
  isMaintenance: boolean;
  isDevServer: boolean;
};
