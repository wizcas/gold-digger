import { gql } from 'graphql-request';
import invariant from 'tiny-invariant';
import { requestGraphCms } from '~/helpers/graphcms';
import { Chest } from '.';

const mutationCollect = gql`
  mutation collectChest($chestId: ID!, $finderId: ID!, $now: DateTime!) {
    created: createFoundRecord(
      data: {
        chest: { connect: { id: $chestId } }
        finder: { connect: { id: $finderId } }
        foundAt: $now
      }
    ) {
      id
    }
  }
`;
const mutationPublish = gql`
  mutation publishRecord($id: ID!) {
    record: publishFoundRecord(where: { id: $id }) {
      id
      foundAt
    }
  }
`;

interface CollectData {
  created: { id: string };
}
interface PublishData {
  record?: { id: string; foundAt: string };
}

export async function collectChest(chestId: string, finderId: string) {
  invariant(chestId, 'chest ID is empty');
  invariant(finderId, 'finder ID is empty');
  const now = new Date().toISOString();
  const { created } = await requestGraphCms<CollectData>(mutationCollect, {
    chestId,
    finderId,
    now,
  });
  if (!created?.id) {
    throw new Error('failed to collect the chest');
  }
  const { record } = await requestGraphCms<PublishData>(mutationPublish, {
    id: created.id,
  });
  if (!record?.id) {
    throw new Error('failed to publish the collection');
  }
  return record;
}
