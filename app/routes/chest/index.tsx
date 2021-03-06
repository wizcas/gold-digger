import classNames from 'classnames';
import dayjs from 'dayjs';
import { Link, LoaderFunction, useLoaderData, useTransition } from 'remix';
import invariant from 'tiny-invariant';
import TextWithStroke from '~/components/TextWithStroke';
import { DATETIME_FORMAT } from '~/helpers/datetime';
import { recognize } from '~/helpers/recognizeFinder';
import { getPeronalAchievement, PersonalAchievement } from '~/services/chest';
import BeatLoader from 'react-spinners/BeatLoader';

export const loader: LoaderFunction = async ({ request }) => {
  const { recognition } = (await recognize(request)) || {};
  const finderId = recognition?.finder?.id;
  invariant(finderId, 'finder ID is empty');
  return getPeronalAchievement(finderId);
};

export default function ChestIndex() {
  const { records, totalAmount } = useLoaderData<PersonalAchievement>();
  const { state } = useTransition();
  const loading = state !== 'idle';
  return (
    <>
      <img src="/images/treasure-deposit.svg" width={211} />
      <TextWithStroke
        color="#BCBADE"
        strokeColor="#6D68B7"
        className="text-5xl font-bold"
      >
        共收缴
      </TextWithStroke>
      <h1 className="text-5xl font-bold text-yellow-200">
        ￥{totalAmount.toFixed(2)}
      </h1>
      <ul className="w-full flex flex-col items-stretch gap-2">
        {records.map((record) => {
          const datetime = dayjs(record.foundAt);
          return (
            <li key={record.id}>
              <Link
                to={record.chestId}
                className={classNames(
                  'flex flex-row justify-between items-center',
                  'w-full p-2 rounded-lg',
                  'bg-light-normal bg-opacity-50 hover:bg-light-secondary',
                  'text-dark-normal',
                  {
                    'bg-opacity-20': loading,
                  }
                )}
              >
                <span className="text-2xl font-bold font-sans text-green-600">
                  ￥{record.chestAmount}
                </span>
                <BeatLoader loading={loading} color="#666" />
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
