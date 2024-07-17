import { Collection, Guild, GuildMember, PartialGuildMember, Role } from 'discord.js';

import { getDifference } from '../utils/helpers';

export const onRoleOrganize = (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
  const member = newMember ?? oldMember;

  const separators = getRoleSeparators(member.guild);
  const beforeUpdateRoles = oldMember.roles.cache.toJSON();
  const afterUpdateRoles = newMember.roles.cache.toJSON();

  const removedRoles = getDifference(beforeUpdateRoles, afterUpdateRoles);
  const addedRoles = getDifference(afterUpdateRoles, beforeUpdateRoles);

  removedRoles.forEach((role) => {
    if (getIsSeparator(role)) return;

    const greaterSeparators = getGreaterSeparators(separators, role);
    if (!greaterSeparators.length || hasSiblingRoles(afterUpdateRoles, role, separators)) return;

    member.roles.remove(greaterSeparators[0]);
  });

  addedRoles.forEach((role) => {
    if (getIsSeparator(role)) return;

    const greaterSeparators = getGreaterSeparators(separators, role);
    if (!greaterSeparators.length) return;

    member.roles.add(greaterSeparators[0]);
  });
};

const getRoleSeparators = (guild: Guild) =>
  guild.roles.cache.filter(getIsSeparator).sort((a, b) => a.position - b.position);

const getIsSeparator = (role: Role) => role.name.startsWith('⠀⠀') && role.name.endsWith('⠀⠀');

const getGreaterSeparators = (separators: Collection<string, Role>, role: Role) =>
  separators
    .filter((separator) => separator.position > role.position)
    .sort((a, b) => a.position - b.position)
    .toJSON();

const hasSiblingRoles = (memberRoles: Role[], role: Role, separators: Collection<string, Role>) => {
  const upperSeparator = separators.find((separator) => separator.position > role.position);
  const lowerSeparator = separators.reverse().find((separator) => separator.position < role.position);

  return memberRoles.some(
    (memberRole) => memberRole.position < upperSeparator.position && memberRole.position > lowerSeparator.position
  );
};
