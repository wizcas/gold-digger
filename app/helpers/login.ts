import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import { refreshAuth, generateAuthSetCookies } from '~/services/alipay';

interface AfterLoginResult {
  accessToken: string;
  headers?: HeadersInit;
}
export async function login(
  request: Request
): Promise<AfterLoginResult | null> {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await alipayAccessToken.parse(cookieHeader);
  if (accessToken) {
    return { accessToken };
  }

  const refreshToken = await alipayRefreshToken.parse(cookieHeader);
  if (refreshToken) {
    const authData = await refreshAuth(refreshToken);
    return {
      accessToken: authData.accessToken,
      headers: await generateAuthSetCookies(authData),
    };
  }

  return null;
}
