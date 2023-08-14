export interface AzureADAuthToken {
  value: string;
  expires: number;
}

export interface AzureADUserProfile {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  email: string;
}
