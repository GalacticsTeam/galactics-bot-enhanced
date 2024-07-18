import type { LocalDBServerConfig } from '../types';

export interface ServerConfig {
  data: LocalDBServerSchema;
  servers: ServersResponse;
}

export interface ServersResponse {
  [serverId: string]: LocalDBServerSchema;
}

export interface LocalDBServerSchema extends LocalDBServerConfig {
  serverId: string;
}
