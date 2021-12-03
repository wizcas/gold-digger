import classNames from 'classnames';
import { useEffect } from 'react';
import {
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useNavigate,
} from 'remix';
import Button from '~/components/Button';
import Main from '~/components/Main';
import { alipayAccessToken, alipayRefreshToken } from '~/cookies';
import { generateAuthSetCookies, refreshAuth } from '~/services/alipay';

const AUTHORIZED_REDIRECT_ROUTE = '/ready';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('Cookie');
  const accessToken = await alipayAccessToken.parse(cookieHeader);
  if (accessToken) {
    return redirect(AUTHORIZED_REDIRECT_ROUTE);
  }

  const refreshToken = await alipayRefreshToken.parse(cookieHeader);
  if (refreshToken) {
    const authData = await refreshAuth(refreshToken);
    return redirect(AUTHORIZED_REDIRECT_ROUTE, {
      headers: await generateAuthSetCookies(authData),
    });
  }

  return json({
    appId: process.env.ALIPAY_APP_ID,
    redirectUri: encodeURI('https://sfq.0x1c.dev/oauth-redirect'),
    scope: 'auth_base,auth_user',
    state: new URL(request.url).searchParams.get('next'),
  });
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: '私房钱大作战',
    description: '无所遁形无处安放',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { appId, redirectUri, scope, state } = useLoaderData();

  function onLogin() {
    window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${appId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
  }

  return (
    <Main>
      <Button
        className={classNames(
          'bg-alipay-normal hover:bg-alipay-light active:bg-alipay-vivid',
          'text-2xl'
        )}
        onClick={onLogin}
      >
        支付宝登录
      </Button>
    </Main>
  );
}
