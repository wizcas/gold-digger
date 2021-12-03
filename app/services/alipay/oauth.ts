import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import { checkThisApp, sdk, validateSdkResult } from './sdk';

interface OAuthResponse {
  userId: string;
  accessToken: string;
  expireIn: number;
  refreshToken: string;
  refreshExpireIn: number;
}

function toOauthResponse(data: Record<string, string>) {
  const now = Date.now();
  return {
    userId: data.userId,
    accessToken: data.accessToken,
    expireIn: +Number.parseInt(data.expiresIn),
    refreshToken: data.refreshToken,
    refreshExpireIn: +Number.parseInt(data.reExpiresIn),
  } as OAuthResponse;
}

export async function authorize(appId: string, authCode: string) {
  checkThisApp(appId);
  console.log('authorizing...');
  const result = await sdk.exec('alipay.system.oauth.token', {
    grantType: 'authorization_code',
    code: authCode,
  });
  console.log('auth done');
  console.log('auth result', { result });
  return toOauthResponse(validateSdkResult(result));
}

export async function refreshAuth(refreshToken: string) {
  const result = await sdk.exec('alipay.system.oauth.token', {
    grantType: 'refresh_token',
    refresh_token: refreshToken,
  });
  return toOauthResponse(validateSdkResult(result));
}

export async function generateAuthSetCookies(
  authData: OAuthResponse | null
): Promise<HeadersInit> {
  const cookies = [
    await alipayAccessToken.serialize(authData?.accessToken || '', {
      maxAge: authData?.expireIn || 0,
    }),
    await alipayRefreshToken.serialize(authData?.refreshToken || '', {
      maxAge: authData?.refreshExpireIn || 0,
    }),
  ];
  return cookies.map((cookie) => ['Set-Cookie', cookie]);
}
