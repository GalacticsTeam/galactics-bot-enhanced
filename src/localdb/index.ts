import axios from 'axios';

import configs from '../configs';
import { localDBPort } from '../utils';
import { setDefaultLocalDBItem } from './helpers';

import type { LocalDBServerConfig } from '../types';
import type { ServerConfig, ServersResponse } from './types';

const localDBBase = axios.create({ baseURL: 'http://localhost:' + localDBPort });

export const getLocalDB = async (serverId: string): Promise<ServerConfig> => {
  const servers = (await localDBBase.get<ServersResponse>('/servers')).data;

  const requestedServer = servers[serverId];

  if (!requestedServer)
    return localDBBase
      .put<ServerConfig, ServerConfig>('/servers', {
        ...servers,
        [serverId]: { serverId, ...configs.localDB },
      })
      .then(() => ({ data: { serverId, ...configs.localDB }, servers }));

  return { data: requestedServer, servers };
};

export const getLocalDBItem = async <T extends keyof LocalDBServerConfig>(
  serverId: string,
  item: T
): Promise<LocalDBServerConfig[T]> => {
  const server = await getLocalDB(serverId);

  localDBBase.put('/servers', {
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

  localDBBase.put('/servers', {
    ...server.servers,
    [server.data.serverId]: {
      ...server.data,
      [itemName]: callBack(updatedServerItem),
    },
  });
};

export const getLocalDBStatus = async () => (await localDBBase.get('/')).status;
