import { defaultLocalDBServerConfig } from '../utils';
import { checkItemType } from '../utils/helpers';

import type { LocalDBServerSchema } from './types';

export const setDefaultLocalDBItem = <Item extends keyof LocalDBServerSchema>(
  server: LocalDBServerSchema,
  itemName: Item
): LocalDBServerSchema[Item] => {
  const { isArray, isObj, isString } = checkItemType(server[itemName]);

  const itemsArr = isArray && [...new Set([...(defaultLocalDBServerConfig as any)[itemName], ...server[itemName]])];
  const itemObj =
    isObj &&
    Object.assign(
      {},
      ...Object.keys((defaultLocalDBServerConfig as any)[itemName]).map((key) => ({
        [key]: (server[itemName] as any)[key] ?? ((defaultLocalDBServerConfig as any)[itemName] as any)[key],
      }))
    );
  const item = (isString && server[itemName]) ?? (defaultLocalDBServerConfig as any)[itemName];

  return itemsArr || itemObj || item;
};
