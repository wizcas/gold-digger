import { Outlet } from 'remix';
import Main from '~/components/Main';

export default function Chest() {
  return (
    <Main vertical="start">
      <Outlet />
    </Main>
  );
}
