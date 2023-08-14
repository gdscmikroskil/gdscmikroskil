import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { azureAD } from '~/lib/azure-ad';
import { discord } from '~/lib/discord';
import { env } from '~/lib/env.mjs';

const AZURE_AD_TOKEN_COOKIE_NAME = 'azure_ad_token';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = cookies();

  const code = searchParams.get('code');

  // If the user is already logged in with azure AD
  // then do discord related stuff
  const existingAzureADToken = cookieStore.get(AZURE_AD_TOKEN_COOKIE_NAME);
  if (existingAzureADToken) {
    if (!code) {
      return redirect(discord.getOAuthAuthorizeUrl().toString());
    }

    if (!existingAzureADToken)
      return redirect(azureAD.getAuthorizationUrl().toString());

    const azureADUserProfile = await azureAD.getUserProfile(
      existingAzureADToken.value
    );

    const discordToken = await discord.getAccessToken(code);
    const discordUserProfile = await discord.getUserProfile(discordToken);
    const isAlreadyJoinGuild = await discord
      .getGuildMemberByUserId(discordUserProfile.id)
      .then(Boolean);

    const discordGuildUrl = `https://discord.com/channels/${env.DISCORD_GUILD_ID}/@home`;

    cookieStore.delete(AZURE_AD_TOKEN_COOKIE_NAME);

    if (!isAlreadyJoinGuild) {
      await discord.addUserToGuild({
        accessToken: discordToken,
        userId: discordUserProfile.id,
        roles: [env.DISCORD_ROLE_ID],
        nickname: azureADUserProfile.givenName,
      });
      return redirect(discordGuildUrl);
    }

    await discord.attachRoleToUser(discordUserProfile.id, env.DISCORD_ROLE_ID);

    redirect(discordGuildUrl);
  }

  if (!code) {
    return redirect(azureAD.getAuthorizationUrl().toString());
  }

  const azureADToken = await azureAD.getAccessTokenByCode(code);

  cookieStore.set({
    name: AZURE_AD_TOKEN_COOKIE_NAME,
    value: azureADToken.value,
    expires: Date.now() + azureADToken.expires,
    httpOnly: true,
  });

  return redirect(discord.getOAuthAuthorizeUrl().toString());
}
