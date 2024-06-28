import { ID, LocalDBServerConfig } from '../types';

export interface ServerConfig {
  data: LocalDBServerSchema;
  servers: ServersResponse;
}

export interface ServersResponse {
  [serverId: ID]: LocalDBServerSchema;
}

export interface LocalDBServerSchema extends LocalDBServerConfig {
  serverId: ID;
}
