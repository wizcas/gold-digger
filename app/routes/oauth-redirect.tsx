import { useEffect, useRef } from 'react';
import { ActionFunction, Form, redirect, useLocation } from 'remix';
import Main from '~/components/Main';
import { authorize, generateAuthSetCookies } from '~/services/alipay';

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const appId = formData.get('appId')?.toString() || '';
    const authCode = formData.get('authCode')?.toString() || '';

    const authData = await authorize(appId, authCode);
    return redirect('/ready', {
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
      </Form>
    </Main>
  );
}
