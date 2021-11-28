import { Link, useLoaderData } from 'remix';
import { getChests } from '~/services/chest';

export const loader = async () => {
  return getChests();
};

export default function ChestIndex() {
  const chests = useLoaderData();
  return (
    <div>
      <h2>Go find the chests!</h2>
      <ul>
        {chests.map((chest) => (
          <li key={chest.id}>
            <Link to={chest.id}>{chest.id}</Link>
            <br />
            <span>{chest.foundTimes} found(s)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
