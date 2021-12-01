import classNames from 'classnames';
import dayjs from 'dayjs';
import { Link, useLoaderData } from 'remix';
import TextWithStroke from '~/components/TextWithStroke';
import { DATETIME_FORMAT } from '~/helpers/datetime';
import { ChestAbstract, getChests } from '~/services/chest';

export const loader = async () => {
  return getChests();
};

export default function ChestIndex() {
  const chests = useLoaderData<ChestAbstract[]>();
  return (
    <>
      <img src="/images/treasure-deposit.svg" width={211} />
      <TextWithStroke
        color="#BCBADE"
        strokeColor="#6D68B7"
        className="text-5xl font-bold"
      >
        已收缴
      </TextWithStroke>
      <h1 className="text-5xl font-bold text-yellow-200">￥2888.88</h1>
      <ul className="w-full flex flex-col items-stretch gap-2">
        {chests.map((chest) => {
          const datetime = dayjs(chest.lastFoundAt);
          return (
            <li key={chest.id}>
              <Link
                to={chest.id}
                className={classNames(
                  'flex flex-row justify-between items-center',
                  'w-full p-2 rounded-lg',
                  'bg-light-normal bg-opacity-50 hover:bg-light-secondary',
                  'text-dark-normal'
                )}
              >
                <span className="text-2xl font-bold font-sans text-green-600">
                  ￥{chest.amount}
                </span>
                <span className="text-center text-sm text-dark-secondary">
                  {datetime.format(DATETIME_FORMAT.date)}
                  <br />
                  {datetime.format(DATETIME_FORMAT.time)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
