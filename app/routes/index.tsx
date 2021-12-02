import classNames from 'classnames';
import { json, MetaFunction, useLoaderData, useNavigate } from 'remix';
import Button from '~/components/Button';
import Main from '~/components/Main';

export const loader = () => {
  return json({
    appId: process.env.ALIPAY_APP_ID,
    redirectUri: encodeURI('https://sfq.0x1c.dev/oauth-redirect'),
    scope: 'auth_base,auth_user',
    // todo: return state for better security
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
  const navigate = useNavigate();
  const { appId, redirectUri, scope } = useLoaderData();

  function onLogin() {
    // navigate('/ready');
    window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${appId}&scope=${scope}&redirect_uri=${redirectUri}`;
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
