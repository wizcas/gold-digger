import { json, LoaderFunction, redirect } from 'remix';
import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import {
  generateAuthSetCookies,
  getUserInfo,
  refreshAuth,
} from '~/services/alipay';
import { Finder, getFinder } from '~/services/finder';

export interface Recognition {
  finder: Finder | null;
}
export function isRecognition(value: any): value is Recognition {
  return typeof value === 'object' && (value.finder || value.find === null);
}

async function recognize(accessToken: string, headers?: HeadersInit) {
  const userInfo = await getUserInfo(accessToken);
  return json({ finder: await getFinder(userInfo.userId) } as Recognition, {
    headers,
  });
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

  const url = new URL(request.url);

  return redirect(`/?next=${url.pathname}`);
};
