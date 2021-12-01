import classNames from 'classnames';
import { Link, MetaFunction, Outlet } from 'remix';
import { useLoaderData } from 'remix';
import Button from '~/components/Button';

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
    <div className="h-full flex flex-col items-center justify-center">
      <Button
        className={classNames(
          'bg-alipay-normal hover:bg-alipay-light active:bg-alipay-vivid',
          'text-2xl'
        )}
      >
        支付宝登录
      </Button>
    </div>
  );
}
