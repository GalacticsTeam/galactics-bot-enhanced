import { defaultServerConfig } from '@utils';
import type { DefaultServerConfig } from '@types';

import type { ServerConfig, ServerConfigOption } from './types';

export const getUpdatedItem = <T extends ServerConfigOption>(itemType: T, filterFn: (item: string) => boolean) =>
  Object.keys(
    itemType === 'list' ? defaultServerConfig : defaultServerConfig[itemType as keyof DefaultServerConfig]
  ).find(filterFn) as ServerConfig<T>;
