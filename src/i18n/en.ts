export default {
  'name.en': 'English',
  'name.ar': 'Arabic',
  'name.galactics': 'Galactics',
  'channel.text': 'Text',
  'channel.voice': 'Voice',
  'channel.category': 'Category',
  'error.clearChat.maximumCount': "Can't clear more than {count} messages at a time",
  'error.clearChat.minimumCount': "Can't clear less than {count} message",
  'error.commandOnlyWorksIn': 'This command only works in {channel} channel',
  'clearChat.deleted': 'Deleted {amount} messages',
  'error.numberMustBeBetween': 'Number must be between {min} and {max}',
  'error.commandIsDisabled': '{command} is disabled in this server.',
  'error.roleIsNotSet': 'Role is not set',
  'channelLock.locked': 'Channel locked',
  'channelLock.unlocked': 'Channel unlocked',
  'maintenance.modeIs': 'Maintenance mode is set to {mode}',
  'error.channelIsNotSet': 'Channel is not set',
  'name.channel': 'Channel',
  'modHelp.fields.problem': 'Problem',
  'error.invalidText.alphabetic-numeric': 'Invalid text, only alphabetic and numeric characters are allowed',
  'preferredLanguage.set': 'Preferred language set to {language}',
  'serverInfo.fields.serverID': 'Server ID',
  'serverInfo.fields.createdOn': 'Created On',
  'serverInfo.fields.foundedBy': 'Founded by',
  'serverInfo.fields.members': 'Members ({count})',
  'serverInfo.fields.channels': 'Channels ({count})',
  'serverInfo.fields.boosts': 'Boosts',
  'serverInfo.fields.language': 'Language',
  'serverInfo.fields.members.users': '{count} Users',
  'serverInfo.fields.members.bots': '{count} Bots',
  'serverInfo.fields.channels.text': '{count} Text',
  'serverInfo.fields.channels.voice': '{count} Voice',
  'serverLanguage.set': 'Server language set to {language}',
  'serverStatus.add.beingAdded': 'Status "{title}" is being added.',
  'serverStatus.remove.noStatuses': 'There are no statuses to remove.',
  'serverStatus.remove.pleaseChoose': 'Please choose a status to remove.',
  'action.makeASelection': 'Make a selection!',
  'serverStatus.remove.statusRemoved': 'Status has been removed.',
  'slowMode.set': 'Slow mode has been set to {time} seconds.',
  'slowMode.disabled': 'Slow mode has been disabled.',
  'error.userNotSet': 'User is not set',
  'userInfo.warnsCount': 'Warns count',
  'name.preferredLanguage': 'Preferred Language',
  'userInfo.lastTimeTouchedGrass': 'Last Time Touched Grass',
  'userInfo.joinedServer': 'Joined Server',
  'autoBan.autoBannedAfter': 'Auto banned after {count} warns',
  'autoBan.autoBanReset': '--auto-ban-reset--',
  'autoBan.auto-banned': 'Auto banned',
  'name.reason': 'Reason',
  'warn.reason.add': 'Add: {reason}',
  'warn.added': 'Added a warn for {user}',
  'warn.remove.noWarns': 'This user has no warns',
  'warn.reason.remove': 'Remove: {reason}',
  'warn.removed': 'Removed a warn for {user}',
  'warn.list.count': 'Warns count: {count}',
  'name.reasons': 'Reasons',
  'serverConfig.updated': '{config} {prop} is set to {value}',
  'name.feature': 'Feature',
  'name.embed': 'Embed',
  'name.property': 'Property',
  'name.role': 'Role',
  'state.enabled': 'Enabled',
  'state.disabled': 'Disabled',
  'serverConfig.embed.error.color': 'Color must be a 6 character hexadecimal',
  'error.valueMustBeA': 'Value must be a {type}',
  'type.number': 'Number',
  'type.string': 'String',
  'type.boolean': 'Boolean',
  'type.array': 'Array',
  'type.object': 'Object',
  'type.function': 'Function',
  'type.undefined': 'Undefined',
  'type.null': 'Null',
  'type.symbol': 'Symbol',
  'type.bigint': 'BigInt',
  'type.unknown': 'Unknown',
  'type.never': 'Never',
  'type.void': 'Void',
  'type.any': 'Any',
  'name.chatting': 'Chatting',
  'linkBlocker.blocked': 'Links are not allowed in this channel',
  'name.ping': 'Ping',
  'name.pong': 'Pong!',
  'welcome.message':
    '>>>       `#` **Welcome** {user} to our server !\n `#` We inform you to read our **rules** `:` {rolesChannel} \n `#` Total members `:` **{membersCount}**\n `#` Enjoy with us :heart_on_fire:',
  'birthday.invalidDate': 'Invalid date',
  'birthday.set': 'Your birthday has been set to {date}',
  'birthday.show': "{user}'s birthday is on {date}",
  'birthday.notSetForUser': "{user}'s birthday is not set yet",
  'birthday.notSet': 'Not set yet',
  'name.birthday': 'Birthday',
} as const;
