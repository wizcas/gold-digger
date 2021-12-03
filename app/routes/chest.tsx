import { Outlet, useLoaderData } from 'remix';
import Main from '~/components/Main';
import { generateMeta } from '~/helpers/meta';
import { recognizeLoader } from '~/helpers/recognizeFinder';
import type { Finder } from '~/services/finder';

export const meta = generateMeta('我的战绩');

export const loader = recognizeLoader;

export default function Chest() {
  const finder = useLoaderData<Finder>();
  return (
    <Main vertical="start">
      <img src={finder.avatar} />
      <div>{finder.name}</div>
      <Outlet />
    </Main>
  );
}
