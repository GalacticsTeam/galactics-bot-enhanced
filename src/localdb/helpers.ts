import { checkItemType } from '@utils';

import type { LocalDBServerSchema } from './types';
import consts from './consts';

export const setDefaultLocalDBItem = <Item extends keyof LocalDBServerSchema>(
  server: LocalDBServerSchema,
  itemName: Item
): LocalDBServerSchema[Item] => {
  const { isArray, isObj, isString } = checkItemType(server[itemName]);

  const itemsArr = isArray && [...new Set([...(consts.localDB as never)[itemName], ...server[itemName]])];
  const itemObj =
    isObj &&
    Object.assign(
      {},
      ...Object.keys((consts.localDB as never)[itemName]).map((key) => ({
        [key]: (server[itemName] as never)[key] ?? ((consts.localDB as never)[itemName] as never)[key],
      }))
    );
  const item = (isString && server[itemName]) ?? (consts.localDB as never)[itemName];

  return itemsArr || itemObj || item;
};
