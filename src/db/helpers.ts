import { defaultServerConfig, defaultUserConfig } from '../utils';

import type { DefaultServerConfig, DefaultUserConfig } from '../types';
import type { ReturnedSchema, SchemaName } from './types';

export const updateSchemaItem = <Schema extends DefaultServerConfig | DefaultUserConfig>(
  schema: ReturnedSchema<Schema>,
  itemName: keyof Schema
) => {
  const defaultConfig =
    (schema.$model().modelName as SchemaName) === 'server' ? defaultServerConfig : defaultUserConfig;

  const isArray = Array.isArray((defaultConfig as any)[itemName]);
  const isObject = typeof (defaultConfig as any)[itemName] === 'object';

  const itemsArr = isArray && [...new Set([...(defaultConfig as any)[itemName], ...(schema as any)[itemName]])];
  const itemObj =
    isObject &&
    Object.assign(
      {},
      ...Object.keys((defaultConfig as any)[itemName]).map((key) => ({
        [key]: (schema[itemName] as any)[key] ?? ((defaultConfig as any)[itemName] as any)[key],
      }))
    );
  const item = schema[itemName] ?? (defaultConfig as any)[itemName];

  schema.$set(String(itemName), isArray ? itemsArr : isObject ? itemObj : item);

  schema.save();
};
