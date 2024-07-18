import axios from 'axios';

import { defaultLocalDBServerConfig } from '../utils';
import { setDefaultLocalDBItem } from './helpers';

import type { LocalDBServerConfig } from '../types';
import type { ServerConfig, ServersResponse } from './types';

const localDB = axios.create({ baseURL: 'http://localhost:4000' });

export const getLocalDB = async (serverId: string): Promise<ServerConfig> => {
  const servers = (await localDB.get<ServersResponse>('/servers')).data;

  const requestedServer = servers[serverId];

  if (!requestedServer)
    return localDB
      .put<ServerConfig, ServerConfig>('/servers', {
        ...servers,
        [serverId]: { serverId, ...defaultLocalDBServerConfig },
      })
      .then(() => ({ data: { serverId, ...defaultLocalDBServerConfig }, servers }));

  return { data: requestedServer, servers };
};

export const getLocalDBItem = async <T extends keyof LocalDBServerConfig>(
  serverId: string,
  item: T
): Promise<LocalDBServerConfig[T]> => {
  const server = await getLocalDB(serverId);

  localDB.put('/servers', {
    ...server.servers,
    [server.data.serverId]: {
      ...server.data,
      [item]: setDefaultLocalDBItem(server.data, item),
    },
  });

  return server.data?.[item];
};

export const setLocalDBItem = async <T extends keyof LocalDBServerConfig>(
  serverId: string,
  itemName: T,
  callBack: (prevState: LocalDBServerConfig[T]) => LocalDBServerConfig[T]
) => {
  const server = await getLocalDB(serverId);
  const updatedServerItem = setDefaultLocalDBItem(server.data, itemName);

  localDB.put('/servers', {
    ...server.servers,
    [server.data.serverId]: {
      ...server.data,
      [itemName]: callBack(updatedServerItem),
    },
  });
};

export const getLocalDBStatus = async () => (await localDB.get('/')).status;
