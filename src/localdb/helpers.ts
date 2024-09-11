import { defaultLocalDBServerConfig } from '../utils';
import { checkItemType } from '../utils/helpers';

import type { LocalDBServerSchema } from './types';

export const setDefaultLocalDBItem = <Item extends keyof LocalDBServerSchema>(
  server: LocalDBServerSchema,
  itemName: Item
): LocalDBServerSchema[Item] => {
  const { isArray, isObj, isString } = checkItemType(server[itemName]);

  const itemsArr = isArray && [...new Set([...(defaultLocalDBServerConfig as never)[itemName], ...server[itemName]])];
  const itemObj =
    isObj &&
    Object.assign(
      {},
      ...Object.keys((defaultLocalDBServerConfig as never)[itemName]).map((key) => ({
        [key]: (server[itemName] as never)[key] ?? ((defaultLocalDBServerConfig as never)[itemName] as never)[key],
      }))
    );
  const item = (isString && server[itemName]) ?? (defaultLocalDBServerConfig as never)[itemName];

  return itemsArr || itemObj || item;
};
