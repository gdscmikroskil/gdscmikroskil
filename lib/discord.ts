import { env } from '~/lib/env.mjs';
import { createEndpoint } from '~/lib/utils';
import { DiscordUserProfile } from '~/types/discord';

class Discord {
  private baseUrl = 'https://discord.com/api/v10';
  private redirectUrl = `${env.BASE_URL}/api/connect`;

  // Create an authorization URL for user to start authentication process
  // https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
  getAuthorizationUrl() {
    return createEndpoint(this.baseUrl, '/oauth2/authorize', {
      client_id: env.DISCORD_CLIENT_ID,
      redirect_uri: this.redirectUrl,
      response_type: 'code',
      scope: ['identify', 'guilds.join'].join(' '),
    });
  }

  // Exchange authorization code for access token
  // https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-exchange-example
  async getAccessTokenByCode(code: string): Promise<string> {
    const endpoint = createEndpoint(this.baseUrl, '/oauth2/token');

    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', env.DISCORD_CLIENT_ID);
    urlencoded.append('client_secret', env.DISCORD_CLIENT_SECRET);
    urlencoded.append('grant_type', 'authorization_code');
    urlencoded.append('code', code);
    urlencoded.append('redirect_uri', this.redirectUrl);

    const response = await fetch(endpoint, {
      method: 'POST',
      body: urlencoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to exchange discord access token');
    }

    const responseJson = await response.json();
    return responseJson.access_token;
  }

  // Attach role to user
  // https://discord.com/developers/docs/resources/guild#add-guild-member-role
  async attachRoleToUser(userId: string, role: string) {
    const endpoint = createEndpoint(
      this.baseUrl,
      `/guilds/${env.DISCORD_GUILD_ID}/members/${userId}/roles/${role}`
    );

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
    });

    if (response.status !== 204) {
      throw new Error('Failed to attach discord role to user');
    }
  }

  // Get user profile using access token
  // https://discord.com/developers/docs/resources/user#get-current-user
  async getUserProfile(accessToken: string): Promise<DiscordUserProfile> {
    const endpoint = createEndpoint(this.baseUrl, '/users/@me');

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get authenticated discord user profile');
    }

    const responseJson = await response.json();

    return {
      id: responseJson.id,
      username: responseJson.username,
      email: responseJson.email,
    };
  }

  // Get guild member by user id
  // https://discord.com/developers/docs/resources/guild#get-guild-member
  async getGuildMemberByUserId(
    userId: string
  ): Promise<DiscordUserProfile | null> {
    const endpoint = createEndpoint(
      this.baseUrl,
      `/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`
    );

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to get discord guild member by user id');
    }

    const responseJson = await response.json();

    return {
      id: responseJson.user.id,
      username: responseJson.user.username,
      email: responseJson.user.email,
    };
  }

  // Add user to guild
  // https://discord.com/developers/docs/resources/guild#add-guild-member
  async addUserToGuild({
    userId,
    accessToken,
    nickname,
    roles = [],
  }: {
    userId: string;
    accessToken: string;
    nickname?: string;
    roles: string[];
  }) {
    const endpoint = createEndpoint(
      this.baseUrl,
      `/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`
    );

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        access_token: accessToken,
        roles: roles,
        nick: nickname,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add user to discord guild');
    }
  }

  // Modify Guild Member
  // https://discord.com/developers/docs/resources/guild#modify-guild-member
  async modifyGuildMember({
    userId,
    nickname,
  }: {
    userId: string;
    nickname?: string;
  }) {
    const endpoint = createEndpoint(
      this.baseUrl,
      `/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`
    );

    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        nick: nickname,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to modify guild member');
    }
  }
}

export const discord = new Discord();
