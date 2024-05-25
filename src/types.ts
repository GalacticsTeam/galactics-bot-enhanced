export type Prefix = 'gt!';

export type command = 'roll-dice';

export type Features = {
  ping: boolean;
} & {
  [t in command]: boolean;
};

export type BotConfig = {
  allowedFeatures: Features;
  prefixes: Prefix[];
  serverId: `${number}`;
};
