import { env } from '~/lib/env.mjs';
import { createEndpoint } from '~/lib/utils';
import { AzureADAuthToken, AzureADUserProfile } from '~/types/azure-ad';

class AzureAD {
  private authBaseUrl = `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/oauth2/v2.0`;
  private graphBaseUrl = 'https://graph.microsoft.com/v1.0';
  private redirectUrl = `${env.BASE_URL}/api/connect`;

  // Create an authorization URL for user to start authentication process
  getAuthorizationUrl() {
    return createEndpoint(this.authBaseUrl, '/authorize', {
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
    const endpoint = createEndpoint(this.authBaseUrl, '/token');

    const response = await fetch(endpoint, {
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
      // Convert seconds to milliseconds
      expires: responseJson.expires_in * 1000,
    };
  }

  // Get user profile using access token
  async getUserProfile(accessToken: string): Promise<AzureADUserProfile> {
    const endpoint = createEndpoint(this.graphBaseUrl, '/me');

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
