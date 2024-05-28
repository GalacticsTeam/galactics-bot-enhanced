import { commands } from './utils';

export type Prefix = 'gt!';

export type commandName = keyof typeof commands;

export type Features = {
  ping: boolean;
  blockLinks: boolean;
} & {
  [t in commandName]: boolean;
};

export type BotConfig = {
  allowedFeatures: Features;
  prefixes: Prefix[];
  serverId: `${number}`;
};
