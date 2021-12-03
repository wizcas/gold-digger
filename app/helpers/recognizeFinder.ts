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
    return json(result.recognition, { headers: result.headers });
  }

  const url = new URL(request.url);
  return redirect(`/?next=${url.pathname}`);
};

export async function recognize(request: Request) {
  const result = await login(request);
  if (result) {
    const userInfo = await getUserInfo(result.accessToken);
    return {
      recognition: { finder: await getFinder(userInfo.userId) } as Recognition,
      headers: result.headers,
    };
  }
  return null;
}
