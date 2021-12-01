import { LoaderFunction } from '@remix-run/server-runtime';
import dayjs from 'dayjs';
import { useLoaderData, useNavigate } from 'remix';
import invariant from 'tiny-invariant';
import { Chest, getChest } from '~/services/chest';
import { marked } from 'marked';
import { useMemo } from 'react';
import TextWithStroke from '~/components/TextWithStroke';
import Button from '~/components/Button';
import { DATETIME_FORMAT } from '~/helpers/datetime';

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  invariant(typeof id === 'string', 'Need chest ID');
  return getChest(id);
};
export default function ChestOfId() {
  const { markdown, amount, lastFoundAt } = useLoaderData<Chest>();
  const navigate = useNavigate();
  const message = useMemo(() => ({ __html: marked(markdown) }), [marked]);
  const amountDisplay = (
    <h1 className="text-5xl font-bold text-yellow-200">￥{amount}</h1>
  );
  const image = (size: number) => (
    <img src="/images/treasure-found.svg" width={size} />
  );
  const renderedMessage = (
    <div
      dangerouslySetInnerHTML={message}
      className="self-stretch rounded-3xl text-dark-normal bg-light-normal bg-opacity-50 p-8"
    />
  );
  const cta = <Button onClick={() => navigate('/chest')}>看看战绩</Button>;
  const newlyFound = (
    <>
      <TextWithStroke
        color="#27D6A1"
        strokeColor="#188162"
        className="text-5xl font-bold"
      >
        Gotcha!
      </TextWithStroke>
      {amountDisplay}
      {image(128)}
      {renderedMessage}
      {cta}
    </>
  );
  const historical = (
    <>
      {amountDisplay}
      {image(128)}
      <div className="flex flex-col items-center gap-4">
        <TextWithStroke
          color="#27D6A1"
          strokeColor="#188162"
          className="text-5xl font-bold"
        >
          已充公
        </TextWithStroke>
        <div className="text-md text-dark-secondary">
          于{' '}
          {dayjs(lastFoundAt).format(
            [DATETIME_FORMAT.date, DATETIME_FORMAT.time].join(' ')
          )}
        </div>
      </div>
      {renderedMessage}
      {cta}
    </>
  );
  return lastFoundAt ? historical : newlyFound;
}
