type Language = 'en' | 'ar';

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

type SchemaName = 'server' | 'user' | 'serverUser';

type Time = 'hour' | 'day' | 'week' | 'month' | 'year';
