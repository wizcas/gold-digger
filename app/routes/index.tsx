import { Link, MetaFunction } from 'remix';
import { useLoaderData } from 'remix';

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: '私房钱大作战',
    description: '无所遁形无处安放',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div>
      <h2>Index</h2>
      <div className="flex flex-col gap-4">
        <Link to="/chest">Chest</Link>
      </div>
    </div>
  );
}
