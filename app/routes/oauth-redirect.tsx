import { useEffect, useRef } from 'react';
import { ActionFunction, Form, redirect, useLocation } from 'remix';
import Main from '~/components/Main';
import {
  authorize,
  generateAuthSetCookies,
  getUserInfo,
} from '~/services/alipay';
import { Finder, registerFinder } from '~/services/finder';

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const appId = formData.get('appId')?.toString() || '';
    const authCode = formData.get('authCode')?.toString() || '';
    const next = formData.get('next')?.toString() || '/ready';

    const authData = await authorize(appId, authCode);
    const userData = await getUserInfo(authData.accessToken);
    const finder: Finder = {
      openId: userData.userId,
      name: userData.nickName,
      avatar: userData.avatar,
      gender: userData.gender,
    };
    await registerFinder(finder);
    return redirect(next, {
      headers: await generateAuthSetCookies(authData),
    });
  } catch (e) {
    console.error('authorize failed', e);
    return redirect('/', {
      headers: await generateAuthSetCookies(null), // clear the auth cookies
    });
  }
};

export default function OAuthRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const appId = params.get('app_id');
  const authCode = params.get('auth_code');
  const next = params.get('state');

  console.log({ next });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, []);

  return (
    <Main>
      <div>登录中...</div>
      <Form method="post" ref={formRef}>
        <input type="hidden" name="appId" value={appId || ''} />
        <input type="hidden" name="authCode" value={authCode || ''} />
        <input type="hidden" name="next" value={next || ''} />
      </Form>
    </Main>
  );
}
