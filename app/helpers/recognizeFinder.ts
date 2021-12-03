import { json, LoaderFunction, redirect } from 'remix';
import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import {
  generateAuthSetCookies,
  getUserInfo,
  refreshAuth,
} from '~/services/alipay';
import { getFinder } from '~/services/finder';

async function recognize(accessToken: string, headers?: HeadersInit) {
  const userInfo = await getUserInfo(accessToken);
  return json(getFinder(userInfo.userId), { headers });
}

export const recognizeLoader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await alipayAccessToken.parse(cookieHeader);
  if (accessToken) {
    return recognize(accessToken);
  }

  const refreshToken = await alipayRefreshToken.parse(cookieHeader);
  if (refreshToken) {
    const authData = await refreshAuth(refreshToken);
    return recognize(
      authData.accessToken,
      await generateAuthSetCookies(authData)
    );
  }

  return redirect(`/?next=${request.url}`);
};
