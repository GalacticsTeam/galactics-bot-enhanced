import consts from '@db/consts';
import type { ServerConfig } from '@types';

import type { ServerConfigProperty, ServerConfigOption } from './types';

export const getUpdatedItem = <T extends ServerConfigOption>(itemType: T, filterFn: (item: string) => boolean) =>
  Object.keys(itemType === 'list' ? consts.server : consts.server[itemType as keyof ServerConfig]).find(
    filterFn
  ) as ServerConfigProperty<T>;
