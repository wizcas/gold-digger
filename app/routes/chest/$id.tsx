import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/server-runtime';
import dayjs from 'dayjs';
import { useLoaderData, useNavigate } from 'remix';
import invariant from 'tiny-invariant';
import { Chest, collectChest, getChest } from '~/services/chest';
import { marked } from 'marked';
import { useEffect, useMemo, useState } from 'react';
import TextWithStroke from '~/components/TextWithStroke';
import Button from '~/components/Button';
import { DATETIME_FORMAT } from '~/helpers/datetime';
import { recognize } from '~/helpers/recognizeFinder';
import markdownStyleUrl from '~/styles/markdown.css';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  console.group('chest id loader', id);
  invariant(id, 'Need chest ID');
  console.log('recognizing finder...');
  const { recognition, headers } = (await recognize(request)) || {};
  const finderId = recognition?.finder?.id;
  console.log('finder recognized', finderId);
  console.log('loading chest...');
  const chest = await getChest(id, finderId);
  console.log('chest loaded', chest);
  console.groupEnd();
  return json(chest, { headers });
};

export const action: ActionFunction = async ({ params, request }) => {
  const { id: chestId } = params;
  invariant(chestId, 'chest ID is empty');
  const { recognition } = (await recognize(request)) || {};
  const finderId = recognition?.finder?.id;
  invariant(finderId, 'finder ID is empty');
  await collectChest(chestId, finderId);
  return null;
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: markdownStyleUrl,
  },
];

export default function ChestOfId() {
  const { markdown, amount, lastFoundAt } = useLoaderData<Chest>();
  const isCollected = !!lastFoundAt;
  const navigate = useNavigate();
  const message = useMemo(() => ({ __html: marked(markdown) }), [marked]);

  useEffect(() => {
    async function collect() {
      console.log('collect it!');
      await fetch('', {
        method: 'POST',
      });
    }
    if (!isCollected) {
      collect();
    }
  }, [isCollected]);

  const amountDisplay = (
    <h1 className="text-5xl font-bold text-yellow-200">￥{amount}</h1>
  );
  const image = (size: number) => (
    <img src="/images/treasure-found.svg" width={size} />
  );
  const renderedMessage = (
    <div
      dangerouslySetInnerHTML={message}
      className="self-stretch rounded-3xl text-dark-normal bg-light-normal bg-opacity-50 p-8 markdown"
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
  return isCollected ? historical : newlyFound;
}
