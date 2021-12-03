import { gql } from 'graphql-request';
import invariant from 'tiny-invariant';
import { requestGraphCms } from '~/helpers/graphcms';
import type { FoundRecord } from './types';

export interface Chest {
  id: string;
  amount: number;
  markdown: string;
  lastFoundAt?: string;
}

interface Data {
  chest: { id: string; amount: number; message: { markdown: string } };
  foundRecords: FoundRecord[];
}

const query = gql`
  query getChestOfFinder($id: ID!, $finderId: ID!) {
    chest(where: { id: $id }) {
      id
      amount
      message {
        markdown
      }
    }
    foundRecords(
      where: { chest: { id: $id }, finder: { id: $finderId } }
      orderBy: foundAt_DESC
    ) {
      id
      foundAt
    }
  }
`;
export async function getChest(id: string, finderId?: string) {
  const { chest, foundRecords } = await requestGraphCms<Data>(query, {
    id,
    finderId,
  });
  invariant(chest, `chest not found: ${id}`);
  return {
    id: chest.id,
    amount: chest.amount,
    markdown: chest.message.markdown || '',
    lastFoundAt: foundRecords[0]?.foundAt,
  } as Chest;
}
