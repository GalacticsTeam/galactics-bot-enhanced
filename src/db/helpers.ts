import { defaultServerConfig, defaultUserConfig } from '../utils';
import { checkItemType } from '../utils/helpers';

import type { DefaultServerConfig, DefaultUserConfig } from '../types';
import type { ReturnedSchema, SchemaName } from './types';

export const setDefaultSchemaItem = <Schema extends DefaultServerConfig | DefaultUserConfig>(
  schema: ReturnedSchema<Schema>,
  itemName: keyof Schema
) => {
  const defaultConfig =
    (schema?.$model().modelName as SchemaName) === 'server' ? defaultServerConfig : defaultUserConfig;
  const { isArray, isObj, isString } = checkItemType(itemName);

  const itemsArr = isArray && [...new Set([...(defaultConfig as never)[itemName], ...(schema as never)[itemName]])];
  const itemObj =
    isObj &&
    Object.assign(
      {},
      ...Object.keys((defaultConfig as never)[itemName]).map((key) => ({
        [key]: (schema[itemName] as never)[key] ?? (defaultConfig as never)[itemName][key],
      }))
    );
  const item = (isString && schema[itemName]) ?? (defaultConfig as never)[itemName];

  schema.$set(String(itemName), itemsArr || itemObj || item);
};
