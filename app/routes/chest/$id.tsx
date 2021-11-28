import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  return { id };
};
export default function ChestOfId() {
  const { id } = useLoaderData();
  return <div>{id}</div>;
}
