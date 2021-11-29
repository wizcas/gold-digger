import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';

export interface ChestAbstract {
  id: string;
  foundTimes: number;
}

const query = gql`
  query getChests {
    chests {
      id
      foundRecords {
        id
      }
    }
  }
`;

export async function getChests() {
  const { chests } = await requestGraphCms<{
    chests: [{ id: string; foundRecords: any[] }];
  }>(query);
  return chests.map(
    (chest) =>
      ({
        id: chest.id,
        foundTimes: chest.foundRecords?.length,
      } as ChestAbstract)
  );
}
