import { DefaultServerConfig } from '../../types';
import { defaultServerConfig } from '../../utils';

import type { ServerConfig, ServerConfigOption } from './types';

export const getUpdatedItem = <T extends ServerConfigOption>(itemType: T, filterFn: (item: string) => boolean) =>
  Object.keys(defaultServerConfig[itemType as keyof DefaultServerConfig]).find(filterFn) as ServerConfig<T>;
