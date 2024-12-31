import type { ServerConfig, Embed, Feature, Property } from '@types';

export type ServerConfigOption = keyof Omit<ServerConfig, 'isMaintenance' | 'isDevServer'> | 'list';

export type ServerConfigProperty<T extends ServerConfigOption> = T extends 'features'
  ? Feature
  : T extends 'channels'
    ? Channel
    : T extends 'roles'
      ? Role
      : T extends 'properties'
        ? Property
        : T extends 'embeds'
          ? Embed
          : T extends 'list'
            ? keyof ServerConfig
            : never;
