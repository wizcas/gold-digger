import classNames from 'classnames';
import { MetaFunction, useNavigate } from 'remix';
import Button from '~/components/Button';
import Main from '~/components/Main';

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: '私房钱大作战',
    description: '无所遁形无处安放',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const navigate = useNavigate();

  function onLogin() {
    navigate('/ready');
  }

  return (
    <Main>
      <Button
        className={classNames(
          'bg-alipay-normal hover:bg-alipay-light active:bg-alipay-vivid',
          'text-2xl'
        )}
        onClick={onLogin}
      >
        支付宝登录
      </Button>
    </Main>
  );
}
