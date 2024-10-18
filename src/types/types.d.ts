type Channel =
  | 'logs'
  | 'modLogs'
  | 'welcome'
  | 'rules'
  | 'statusCategory'
  | 'tempChannelCategory'
  | 'tempChannelGenerator'
  | 'tempChannelCommands';

type Role = 'bot' | 'member' | 'maintenance' | 'lowestAuthorizedRole';
