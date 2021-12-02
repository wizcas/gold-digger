import { sdk, validateSdkResult } from './sdk';

const ENDPOINT = 'alipay.user.info.share';

interface AlipayUserInfo {
  userId: string;
  avatar: string;
  nickName: string;
  gender: 'm' | 'f';
}

export async function getUserInfo(accessToken: string) {
  const result = await sdk.exec(ENDPOINT, {
    auth_token: accessToken,
  });
  const { userId, nickName, avatar, gender } = validateSdkResult(result);
  return {
    userId,
    nickName,
    avatar,
    gender: `${gender}`.toLowerCase(),
  } as AlipayUserInfo;
}
