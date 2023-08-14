import { env } from '~/lib/env.mjs';
import { buildEndpoint } from '~/lib/utils';
import { AzureADAuthToken, AzureADUserProfile } from '~/types/azure-ad';

class AzureAD {
  private authBaseUrl = `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/oauth2/v2.0`;
  private graphBaseUrl = 'https://graph.microsoft.com/v1.0';
  private redirectUrl = `${env.BASE_URL}/api/connect`;

  // Create an authorization URL for user to start authentication process
  getAuthorizationUrl() {
    return buildEndpoint(this.authBaseUrl, '/authorize', {
      client_id: env.AZURE_AD_CLIENT_ID,
      response_type: 'code',
      response_mode: 'query',
      prompt: 'select_account',
      redirect_uri: this.redirectUrl,
      scope: 'https://graph.microsoft.com/User.Read',
    });
  }

  // Exchange authorization code for access token
  async getAccessTokenByCode(code: string): Promise<AzureADAuthToken> {
    const url = buildEndpoint(this.authBaseUrl, '/token');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: env.AZURE_AD_CLIENT_ID,
        client_secret: env.AZURE_AD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        scope: 'https://graph.microsoft.com/User.Read',
        redirect_uri: this.redirectUrl,
        code,
      }),
    });
    const responseJson = await response.json();

    return {
      value: responseJson.access_token,
      type: responseJson.token_type,
    };
  }

  // Get user profile using access token
  async getUserProfile(token: AzureADAuthToken): Promise<AzureADUserProfile> {
    const url = buildEndpoint(this.graphBaseUrl, '/me');

    const response = await fetch(url, {
      headers: {
        Authorization: `${token.type} ${token.value}`,
      },
    });
    const responseJson = await response.json();

    return {
      id: responseJson.id,
      displayName: responseJson.displayName,
      givenName: responseJson.givenName,
      surname: responseJson.surname,
      email: responseJson.mail,
    };
  }
}

export const azureAD = new AzureAD();
