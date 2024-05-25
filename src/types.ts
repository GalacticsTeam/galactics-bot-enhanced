export type Prefix = 'gt!';

export type Features = {
  ping: boolean;
};

export type BotConfig = {
  allowedFeatures: Features;
  prefixes: Prefix[];
  serverId: `${number}`;
};
