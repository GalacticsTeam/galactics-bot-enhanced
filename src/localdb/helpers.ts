import { defaultLocalDBServerConfig } from '../utils';

import type { LocalDBServerSchema } from './types';

export const updatedLocalDBItem = <Item extends keyof LocalDBServerSchema>(
  server: LocalDBServerSchema,
  itemName: Item
): LocalDBServerSchema[Item] => {
  const isArray = Array.isArray((defaultLocalDBServerConfig as any)[itemName]);
  const isObject = typeof (defaultLocalDBServerConfig as any)[itemName] === 'object';

  const itemsArr = isArray && [...new Set([...(defaultLocalDBServerConfig as any)[itemName], ...server[itemName]])];
  const itemObj =
    isObject &&
    Object.assign(
      {},
      ...Object.keys((defaultLocalDBServerConfig as any)[itemName]).map((key) => ({
        [key]: (server[itemName] as any)[key] ?? ((defaultLocalDBServerConfig as any)[itemName] as any)[key],
      }))
    );
  const item = server[itemName] ?? (defaultLocalDBServerConfig as any)[itemName];

  return isArray ? itemsArr : isObject ? itemObj : item;
};
