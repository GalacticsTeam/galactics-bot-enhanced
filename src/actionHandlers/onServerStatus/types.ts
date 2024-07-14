export interface Status {
  title: string;
  type: StatusType;
  value: string;
  id: string;
}

export interface StatusChannel extends Status {
  channelId: string;
}

export type StatusType = 'role' | 'youtube';
