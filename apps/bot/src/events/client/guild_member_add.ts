import type { GuildMember } from "discord.js";

import { type Client, defineEvent, LogLevel } from "../../app/client.js";
import config from "../../app/config.js";

export default defineEvent({
  name: "guildMemberAdd",
  once: false,
  async execute(client: Client, member: GuildMember) {
    const memberRoleId = config.DISCORD_ROLE_MEMBER_ID;

    const role = await member.guild.roles.fetch(memberRoleId);
    if (!role)
      return client.logger(
        LogLevel.ERROR,
        "GuildMemberAdd",
        `Role with ID ${memberRoleId} not found`,
      );

    const memberHasRole = member.roles.cache.has(memberRoleId);
    if (memberHasRole) return;

    try {
      await member.roles.add(role);
    } catch (err) {
      client.logger(
        LogLevel.ERROR,
        "GuildMemberAdd",
        "An error occurred while adding role to member",
        err,
      );
    }
  },
});
