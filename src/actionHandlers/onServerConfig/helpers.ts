import type { ServerConfig, ServerConfigOption } from './types';

export const getUpdatedItem = <T extends ServerConfigOption>(itemType: T, filterFn: (item: string) => boolean) =>
  Object.keys(itemType).find(filterFn) as ServerConfig<T>;
