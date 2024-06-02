import { Document, Schema, Types, model } from 'mongoose';

import { defaultServerConfig, features } from '../utils';

import type { DefaultServerConfig, ID } from '../types';

export interface Server extends DefaultServerConfig {
  serverId: string;
}

export const ServerSchema = model<Server>(
  'server',
  new Schema<Server>({
    serverId: String,
    features,
    prefixes: [String],
    isMaintenance: Boolean,
    isDevServer: Boolean,
    embeds: { color: String },
  })
);

type ReturnedServerSchema = Document<unknown, {}, Server> & Server & { _id: Types.ObjectId };

export const getServerSchema = async (serverId: ID): Promise<ReturnedServerSchema> =>
  await ServerSchema.findOne({ serverId });

export const setNewServerSchema = (serverInfo: Server) => new ServerSchema(serverInfo).save();

export const getServerItem = async <T extends keyof DefaultServerConfig>(
  serverId: ID,
  itemName: T
): Promise<DefaultServerConfig[T]> => {
  const server = await getServerSchema(serverId);

  updateServerSchemaItem(server, itemName);

  return server[itemName];
};

export const updateServerSchemaItem = (server: ReturnedServerSchema, serverInfoName: keyof DefaultServerConfig) => {
  const isArray = Array.isArray(defaultServerConfig[serverInfoName]);
  const isObject = typeof defaultServerConfig[serverInfoName] === 'object';

  server.$set(
    serverInfoName,
    isArray
      ? [...new Set([...(defaultServerConfig as any)[serverInfoName], ...(server as any)[serverInfoName]])]
      : isObject
      ? Object.assign(
          {},
          ...Object.keys(defaultServerConfig[serverInfoName]).map((key) => ({
            [key]: (server[serverInfoName] as any)[key] ?? (defaultServerConfig[serverInfoName] as any)[key],
          }))
        )
      : server[serverInfoName] ?? defaultServerConfig[serverInfoName]
  );

  server.save();
};
