export interface AzureADAuthToken {
  value: string;
  type: string;
}

export interface AzureADUserProfile {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  email: string;
}
