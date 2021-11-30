import type { MetaFunction } from 'remix';
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
  return <div>Index</div>;
}
