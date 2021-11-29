import dayjs, { Dayjs } from 'dayjs';
import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';

export interface FoundRecord {
  id: string;
  byId: string;
  byName: string;
  foundAt: Dayjs;
}
export interface Chest {
  id: string;
  amount: number;
  markdown: string;
  foundRecords: FoundRecord[];
}

interface Response {
  chest: { id: string; amount: number; message: { markdown: string } };
  foundRecords: {
    id: string;
    finder: { id: string; name: string };
    foundAt: string;
  }[];
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
    foundRecords(where: { chest: { id: $id } }) {
      id
      finder {
        id
        name
      }
      foundAt
    }
  }
`;
export async function getChest(id: string) {
  const { chest, foundRecords } = await requestGraphCms<Response>(query, {
    id,
  });
  return {
    id: chest.id,
    amount: chest.amount,
    markdown: chest.message.markdown || '',
    foundRecords: foundRecords.map(
      (record) =>
        ({
          id: record.id,
          byId: record.finder.id,
          byName: record.finder.name,
          foundAt: dayjs(record.foundAt),
        } as FoundRecord)
    ),
  } as Chest;
}
