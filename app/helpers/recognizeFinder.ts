import { json, LoaderFunction, redirect } from 'remix';
import { getUserInfo } from '~/services/alipay';
import { Finder, getFinder } from '~/services/finder';
import { login } from './login';

export interface Recognition {
  finder: Finder | null;
}
export function isRecognition(value: any): value is Recognition {
  return typeof value === 'object' && (value.finder || value.find === null);
}

export const recognizeLoader: LoaderFunction = async ({ request }) => {
  const result = await recognize(request);
  if (result) {
    console.log('<recognize loader> succeed: ', result);
    return json(result.recognition, { headers: result.headers });
  }

  const url = new URL(request.url);
  const next = url.pathname;
  console.log('login failed, next=', next);
  return redirect(`/?next=${next}`);
};

export async function recognize(request: Request) {
  const result = await login(request);
  console.log('logged in', result);
  if (result) {
    const userInfo = await getUserInfo(result.accessToken);
    console.log('login user info', userInfo);
    return {
      recognition: { finder: await getFinder(userInfo.userId) } as Recognition,
      headers: result.headers,
    };
  }
  return null;
}
