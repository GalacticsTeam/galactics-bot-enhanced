import type { Guild } from 'discord.js';

import { getServerProperty, setServerProperty } from '@db';

export const onMaintenance = async (guild: Guild) => {
  const members = (await guild.members.fetch()).toJSON();

  const isMaintenance = await getServerProperty(guild.id, 'isMaintenance');
  const { member, bot, maintenance } = await getServerProperty(guild.id, 'roles');

  if (!bot || !member || !maintenance) return;

  const botRole = guild.roles.cache.get(bot);
  const memberRole = guild.roles.cache.get(member);
  const maintenanceRole = guild.roles.cache.get(maintenance);

  if (!botRole || !memberRole || !maintenanceRole) {
    return isMaintenance;
  }

  switch (isMaintenance) {
    case true:
      members.forEach(async (member) => {
        await member.roles.remove(maintenanceRole);

        if (member.user.bot) return await member.roles.add(botRole);

        await member.roles.add(memberRole);
      });

      break;

    case false:
      members.forEach(async (member) => {
        const memberRoles = member.roles.cache.filter(
          (role) => role.tags?.botId !== member.user.id && !role.tags?.premiumSubscriberRole
        );

        await member.roles.remove(memberRoles);

        await member.roles.add(maintenanceRole);
      });

      break;
  }

  return await setServerProperty(guild.id, 'isMaintenance', (prevIsMaintenance) => !prevIsMaintenance);
};
