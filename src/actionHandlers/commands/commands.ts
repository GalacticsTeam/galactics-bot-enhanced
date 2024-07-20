import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';
import { slowMode } from './slowMode';
import { unlockChannel } from './unlockChannel';
import { lockChannel } from './lockChannel';
import { serverConfig } from './serverConfig';
import { modHelp } from './modHelp';
import { warn } from './warn';
import { serverStatus } from './serverStatus';
import { maintenance } from './maintenance';

export const commands = [
  { name: 'roll-dice', type: 'diceRoll', interaction: diceRoll },
  { name: 'avatar', type: 'avatar', interaction: avatar },
  { name: 'user', type: 'user', interaction: user },
  { name: 'clear', type: 'clearChat', interaction: clearChat },
  { name: 'server-info', type: 'serverInfo', interaction: serverInfo },
  { name: 'slow-mode', type: 'slowMode', interaction: slowMode },
  { name: 'unlock-channel', type: 'unlockChannel', interaction: unlockChannel },
  { name: 'lock-channel', type: 'lockChannel', interaction: lockChannel },
  { name: 'server-config', type: 'serverConfig', interaction: serverConfig },
  { name: 'mod-help', type: 'modHelp', interaction: modHelp },
  { name: 'warn', type: 'warn', interaction: warn },
  { name: 'server-status', type: 'serverStatus', interaction: serverStatus },
  { name: 'maintenance', type: 'maintenance', interaction: maintenance },
] as const;
