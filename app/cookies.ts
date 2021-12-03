import { createCookie } from 'remix';

export const alipayAccessToken = createCookie('alipay_access_token', {
  maxAge: 604_800, // one week
  path: '/',
});
export const alipayRefreshToken = createCookie('alipay_refresh_token', {
  maxAge: 604_800, // one week
  path: '/',
});
