import type { DefaultServerConfig, Embed, Feature, Property } from '@types';

export type ServerConfigOption = keyof Omit<DefaultServerConfig, 'isMaintenance' | 'isDevServer'> | 'list';

export type ServerConfig<T extends ServerConfigOption> = T extends 'features'
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
            ? keyof DefaultServerConfig
            : never;
