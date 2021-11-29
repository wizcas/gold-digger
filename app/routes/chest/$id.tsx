import { LoaderFunction } from '@remix-run/server-runtime';
import dayjs from 'dayjs';
import { useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Chest, getChest } from '~/services/chest';

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  invariant(typeof id === 'string');
  return getChest(id);
};
export default function ChestOfId() {
  const { markdown, amount, foundRecords } = useLoaderData<Chest>();
  console.log(foundRecords);
  return (
    <div>
      <div>{amount}</div>
      <div>{markdown}</div>
      <div>
        <ul>
          {foundRecords.map((record) => (
            <li key={record.id}>
              {record.byName} @{' '}
              {dayjs(record.foundAt).format('YYYY.MM.DD HH:mm:ss')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
