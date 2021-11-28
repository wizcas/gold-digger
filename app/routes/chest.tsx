import { Outlet } from 'remix';

export default function Chest() {
  return (
    <div>
      <h1>You found a gold chest!</h1>
      <Outlet />
    </div>
  );
}
