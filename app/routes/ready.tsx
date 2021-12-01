import { useNavigate } from 'remix';
import Button from '~/components/Button';
import Main from '~/components/Main';

export default function IndexReady() {
  const navigate = useNavigate();
  return (
    <Main>
      <img src="/images/qr-code.svg" width={256} />
      <h1 className="text-4xl text-bold">找到家里的二维码！</h1>
      <Button onClick={() => navigate('/chest')}>看看战绩</Button>
    </Main>
  );
}
