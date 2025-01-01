import {
  Schema,
  type DefaultSchemaOptions,
  type Model,
  type SchemaDefinition,
  type SchemaDefinitionType,
} from 'mongoose';

import { checkItemType } from '@utils';

import consts from './consts';

export const fillSchemaProperty = <T extends SchemaName, Property extends keyof (typeof consts)[T]>(
  schemaName: T,
  schemaData: (typeof consts)[T],
  property: Property
) => {
  const config = consts[schemaName];
  const { isArray, isObj, isString } = checkItemType(schemaData[property]);

  const itemsArr = isArray
    ? Array.from(new Set([...(config[property] as []), ...(schemaData[property] as [])]))
    : undefined;
  const itemObj = isObj ? { ...config[property], ...schemaData[property] } : undefined;
  const item = isString ? (schemaData[property] ?? config[property]) : undefined;

  return (itemsArr || itemObj || item) as (typeof config)[Property];
};

export const createSchema = <T>(schema: SchemaDefinition<SchemaDefinitionType<T>, T>) =>
  new Schema<T, Model<T>, object, object, object, DefaultSchemaOptions, T>(schema);
