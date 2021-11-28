import { gql } from 'graphql-request';
import { requestGraphCms } from '~/helpers/graphcms';

export async function getChests() {
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
  const { chests } = await requestGraphCms<{
    chests: [{ id: string; foundRecords: any[] }];
  }>(query);
  return chests.map((chest) => ({
    id: chest.id,
    foundTimes: chest.foundRecords?.length,
  }));
}
