import { redirect } from 'next/navigation';

import { azureAD } from '~/lib/azure-ad';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');

  if (!code) {
    return redirect(azureAD.getAuthorizationUrl().toString());
  }

  const azureADToken = await azureAD.getAccessTokenByCode(code);
  const azureADUserProfile = await azureAD.getUserProfile(azureADToken);

  return new Response(JSON.stringify(azureADUserProfile), {
    headers: { 'content-type': 'application/json' },
  });
}
