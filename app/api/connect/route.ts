import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { azureAD } from '~/lib/azure-ad';
import { discord } from '~/lib/discord';
import { env } from '~/lib/env.mjs';

const AZURE_AD_TOKEN_COOKIE_NAME = 'azure_ad_token';
const DISCORD_GUILD_URL = `https://discord.com/channels/${env.DISCORD_GUILD_ID}/@home`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = cookies();
  const code = searchParams.get('code');

  // If the user is already logged in with azure AD
  // then do discord related stuff
  const existingAzureADToken = cookieStore.get(AZURE_AD_TOKEN_COOKIE_NAME);
  if (existingAzureADToken) {
    // If user not have discord code then redirect to discord oauth to create code
    if (!code) {
      return redirect(discord.getAuthorizationUrl().toString());
    }

    try {
      // Get user profile from azure AD
      const azureADUserProfile = await azureAD.getUserProfile(
        existingAzureADToken.value
      );

      // Get discord token and user profile
      const discordToken = await discord.getAccessTokenByCode(code);
      const discordUserProfile = await discord.getUserProfile(discordToken);
      const isAlreadyJoinGuild = await discord
        .getGuildMemberByUserId(discordUserProfile.id)
        .then(Boolean);

      // If user already join guild then attach role to user
      if (isAlreadyJoinGuild) {
        for (const role of env.DISCORD_ROLE_IDS) {
          await discord.attachRoleToUser(discordUserProfile.id, role);
        }
      } else {
        // If user not join guild then add user to guild with role and nickname
        await discord.addUserToGuild({
          accessToken: discordToken,
          userId: discordUserProfile.id,
          roles: env.DISCORD_ROLE_IDS,
          nickname: azureADUserProfile.givenName,
        });
      }
    } catch (error) {
      console.error(error);
      return redirect('/?error=ConnectFailed');
    } finally {
      cookieStore.delete(AZURE_AD_TOKEN_COOKIE_NAME);
    }
    return redirect(DISCORD_GUILD_URL);
  }

  // If user not have azure ad code then redirect to azure AD oauth to create code
  if (!code) {
    return redirect(azureAD.getAuthorizationUrl().toString());
  }

  try {
    // Get azure AD token and set to cookie
    const azureADToken = await azureAD.getAccessTokenByCode(code);

    cookieStore.set({
      name: AZURE_AD_TOKEN_COOKIE_NAME,
      value: azureADToken.value,
      expires: Date.now() + azureADToken.expires,
      httpOnly: true,
    });
  } catch (error) {
    console.error(error);
    return redirect('/?error=ConnectFailed');
  }

  // After success get azure AD token then redirect to discord auth flow
  return redirect(discord.getAuthorizationUrl().toString());
}
