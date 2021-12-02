import { useEffect } from 'react';
import { ActionFunction, json, LoaderFunction, useLocation } from 'remix';
import Main from '~/components/Main';
import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import { authorize } from '~/services/alipay';
import { getUserInfo } from '~/services/alipay/getUserInfo';

export const action: ActionFunction = async ({ request }) => {
  try {
    const { appId, authCode } = await request.json();
    console.log('action data', { appId, authCode });
    const authResult = await authorize(appId, authCode);
    console.log(authResult);
    const userInfo = await getUserInfo(authResult.accessToken);
    console.log(userInfo);

    const cookies = [
      await alipayAccessToken.serialize(authResult.accessToken, {
        maxAge: authResult.expireIn,
      }),
      await alipayRefreshToken.serialize(authResult.refreshToken, {
        maxAge: authResult.refreshExpireIn,
      }),
    ];

    return json(userInfo, {
      headers: cookies.map((cookie) => ['Set-Cookie', cookie]),
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default function OAuthRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const appId = params.get('app_id');
  const authCode = params.get('auth_code');

  const data = { appId, authCode };

  useEffect(() => {
    fetch('', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  return <Main>登录中...</Main>;
}
