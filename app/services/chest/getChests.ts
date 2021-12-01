import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';
import type { FoundRecord } from './types';

export interface ChestAbstract {
  id: string;
  amount: number;
  lastFoundAt: string;
}

interface ChestData {
  id: string;
  amount: number;
  foundRecords: FoundRecord[];
}

const query = gql`
  query getChests {
    chests {
      id
      amount
      foundRecords(orderBy: foundAt_DESC) {
        id
        foundAt
      }
    }
  }
`;

export async function getChests() {
  const { chests } = await requestGraphCms<{
    chests: ChestData[];
  }>(query);
  return chests.map(
    (chest) =>
      ({
        id: chest.id,
        amount: chest.amount,
        lastFoundAt: chest.foundRecords[0]?.foundAt,
      } as ChestAbstract)
  );
}
