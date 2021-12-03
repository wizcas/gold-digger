import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';
import { FoundRecord, FoundRecordRemote } from './types';

const query = gql`
  query getRecordsByFinderId($finderId: ID!) {
    foundRecords(where: { finder: { id: $finderId } }, orderBy: foundAt_DESC) {
      id
      chest {
        id
        amount
      }
      foundAt
    }
  }
`;

export interface PersonalRecord {
  id: string;
  foundAt: string;
  chestId: string;
  chestAmount: number;
}

export interface PersonalAchievement {
  totalAmount: number;
  records: PersonalRecord[];
}

interface Data {
  foundRecords: FoundRecordRemote[];
}

export async function getPeronalAchievement(finderId: string) {
  const { foundRecords } = await requestGraphCms<Data>(query, { finderId });
  let totalAmount = 0;
  const records = foundRecords.map(({ id, foundAt, chest }) => {
    const { id: chestId, amount: chestAmount } = chest;
    totalAmount += chestAmount;
    return {
      id,
      foundAt,
      chestId,
      chestAmount,
    } as PersonalRecord;
  });
  return { records, totalAmount } as PersonalAchievement;
}
