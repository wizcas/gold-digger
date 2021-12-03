import { gql } from 'graphql-request';
import invariant from 'tiny-invariant';
import { requestGraphCms } from '~/helpers/graphcms';
import type { Finder } from './types';

const mutation = gql`
  mutation registerFinder(
    $openId: String!
    $name: String!
    $avatar: String
    $gender: Gender
  ) {
    upsertFinder(
      where: { openId: $openId }
      upsert: {
        create: {
          openId: $openId
          name: $name
          avatar: $avatar
          gender: $gender
        }
        update: { name: $name, avatar: $avatar, gender: $gender }
      }
    ) {
      id
      openId
      name
      avatar
      gender
    }
    publishFinder(where: { openId: $openId }) {
      id
    }
  }
`;

interface Data {
  upsertFinder: Finder;
}

export async function registerFinder({ openId, name, avatar, gender }: Finder) {
  invariant(openId, 'open ID is empty');
  invariant(name, 'name is empty');
  const data = await requestGraphCms<Data>(mutation, {
    openId,
    name,
    avatar,
    gender,
  });
  return data.upsertFinder;
}
