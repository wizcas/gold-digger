import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';
import type { Finder } from './types';

const query = gql`
  query getFinder($openId: String!) {
    finder(where: { openId: $openId }) {
      id
      openId
      name
      avatar
      gender
    }
  }
`;

interface Data {
  finder: Finder | null;
}

export async function getFinder(openId: string) {
  const data = await requestGraphCms<Data>(query, { openId });
  return data.finder;
}
