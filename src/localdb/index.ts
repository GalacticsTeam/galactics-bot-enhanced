import axios from 'axios';

import { defaultLocalDBServerConfig } from '../utils';
import { updateLocalDBItem } from './helpers';

import type { ID, LocalDBServerConfig } from '../types';
import type { ServerConfig, ServersResponse } from './types';

const LOCAL_DB_API = axios.create({ baseURL: 'http://localhost:4000' });

export const getServerDB = async (serverId: ID): Promise<ServerConfig> => {
  const servers = (await LOCAL_DB_API.get<ServersResponse>('/servers')).data;

  const requestedServer = servers[serverId];

  if (!requestedServer)
    return LOCAL_DB_API.put<ServerConfig, ServerConfig>('/servers', {
      ...servers,
      [serverId]: { serverId, ...defaultLocalDBServerConfig },
    }).then(() => ({ data: { serverId, ...defaultLocalDBServerConfig }, servers }));

  return { data: requestedServer, servers };
};

export const getDBItem = async <T extends keyof LocalDBServerConfig>(
  serverId: ID,
  item: T
): Promise<LocalDBServerConfig[T]> => {
  const server = await getServerDB(serverId);

  return server.data?.[item];
};

export const setDBItem = async <T extends keyof LocalDBServerConfig>(
  serverId: ID,
  itemName: T,
  callBack: (prevState: LocalDBServerConfig[T]) => LocalDBServerConfig[T]
) => {
  const server = await getServerDB(serverId);
  const updatedServerItem = updateLocalDBItem(server.data, itemName);

  LOCAL_DB_API.put('/servers', {
    ...server.servers,
    [server.data.serverId]: {
      ...server.data,
      [itemName]: callBack(updatedServerItem),
    },
  });
};

export const getLocalDBStatus = async () => (await LOCAL_DB_API.get('/')).status;
