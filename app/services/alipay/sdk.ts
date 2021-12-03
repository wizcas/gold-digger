import AlipaySdk, { AlipaySdkCommonResult } from 'alipay-sdk';
import invariant from 'tiny-invariant';

const envs = {
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
};
invariant(envs.appId, 'alipay app ID is not found');
invariant(envs.appId, 'alipay private key is not found');

const ALIPAY_CODE = {
  success: '10000',
};

export const sdk = new AlipaySdk({
  appId: envs.appId,
  privateKey: envs.privateKey,
  charset: 'utf-8',
});

export function checkThisApp(appId: string) {
  invariant(appId === envs.appId, 'Alipay app ID is not matched');
}

export function validateSdkResult(
  result: AlipaySdkCommonResult | string
): Record<string, any> {
  if (typeof result !== 'object')
    throw new Error(`invalid alipay response: ${result}`);

  return result as Record<string, any>;
}
