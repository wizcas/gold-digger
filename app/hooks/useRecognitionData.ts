import { useContext, useEffect } from 'react';
import { useLoaderData } from 'remix';
import { RecognitionContext } from '~/contexts/RecognitionContext';
import { isRecognition, Recognition } from '~/helpers/recognizeFinder';

export function useRecognitionData() {
  let recognition = useLoaderData<Recognition>();
  const recognitionCtx = useContext(RecognitionContext);
  if (recognition && isRecognition(recognition)) {
    useEffect(() => {
      recognitionCtx.update(recognition);
    }, [recognitionCtx, recognition]);
  } else {
    recognition = recognitionCtx.recognition;
  }
  return recognition;
}
