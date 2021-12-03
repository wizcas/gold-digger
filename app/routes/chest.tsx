import { Outlet } from 'remix';
import Main from '~/components/Main';
import { generateMeta } from '~/helpers/meta';

export const meta = generateMeta('我的战绩');

export default function Chest() {
  return (
    <Main vertical="start">
      <Outlet />
    </Main>
  );
}
