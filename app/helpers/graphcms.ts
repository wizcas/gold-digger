import request from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request/dist/types';
import invariant from 'tiny-invariant';

type OmitUrlParameter<T> = T extends (url: string, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;
type QueryFunction = OmitUrlParameter<typeof request>;

export async function requestGraphCms<T = any, V = Variables>(
  document: RequestDocument,
  variables?: V,
  headers?: HeadersInit
): Promise<T> {
  const url = process.env.GRAPHCMS_URL;
  invariant(url);
  return request(url, document, variables, {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    ...headers,
  });
}
