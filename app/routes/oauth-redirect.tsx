import { LoaderFunction, useLocation } from 'remix';
import Main from '~/components/Main';

export default function OAuthRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const authCode = params.get('auth_code');
  const appId = params.get('app_id');

  console.log({ authCode, appId });

  return <Main>登录中...</Main>;
}
