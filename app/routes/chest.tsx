import { useContext } from 'react';
import { Outlet, useLoaderData } from 'remix';
import Main from '~/components/Main';
import { generateMeta } from '~/helpers/meta';
import { Recognition, recognizeLoader } from '~/helpers/recognizeFinder';
import { useRecognitionData } from '~/hooks/useRecognitionData';
import { RecognitionContext } from '../contexts/RecognitionContext';

export const meta = generateMeta('我的战绩');

export const loader = recognizeLoader;

export default function Chest() {
  useRecognitionData();
  return (
    <Main vertical="start">
      <Outlet />
    </Main>
  );
}
