import configs from '../const';
import { checkItemType } from '../utils/helpers';

import type { LocalDBServerSchema } from './types';

export const setDefaultLocalDBItem = <Item extends keyof LocalDBServerSchema>(
  server: LocalDBServerSchema,
  itemName: Item
): LocalDBServerSchema[Item] => {
  const { isArray, isObj, isString } = checkItemType(server[itemName]);

  const itemsArr = isArray && [...new Set([...(configs.localDB as never)[itemName], ...server[itemName]])];
  const itemObj =
    isObj &&
    Object.assign(
      {},
      ...Object.keys((configs.localDB as never)[itemName]).map((key) => ({
        [key]: (server[itemName] as never)[key] ?? ((configs.localDB as never)[itemName] as never)[key],
      }))
    );
  const item = (isString && server[itemName]) ?? (configs.localDB as never)[itemName];

  return itemsArr || itemObj || item;
};
