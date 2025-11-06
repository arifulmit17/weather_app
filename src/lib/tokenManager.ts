// src/lib/tokenManager.ts
export const tokenManager = {
    getAccessToken: (): string | null => localStorage.getItem('accessToken'),
    setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
    getRefreshToken: (): string | null => localStorage.getItem('refreshToken'),
    setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  };