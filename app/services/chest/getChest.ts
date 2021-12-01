import { gql } from 'graphql-request';
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
  query getChest($id: ID!) {
    chest(where: { id: $id }) {
      id
      amount
      message {
        markdown
      }
    }
    foundRecords(where: { chest: { id: $id } }, orderBy: foundAt_DESC) {
      id
      foundAt
    }
  }
`;
export async function getChest(id: string) {
  const { chest, foundRecords } = await requestGraphCms<Data>(query, {
    id,
  });
  return {
    id: chest.id,
    amount: chest.amount,
    markdown: chest.message.markdown || '',
    lastFoundAt: foundRecords[0]?.foundAt,
  } as Chest;
}
