const errorDetails: Record<string, { title: string; description: string }> = {
  ConnectFailed: {
    title: 'Failed connect to Discord!',
    description: 'Something went wrong, please try again or contact us.',
  },
};

export function getErrorDetail(key?: string) {
  if (!key) return null;
  return errorDetails[key];
}
