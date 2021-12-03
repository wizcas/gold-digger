import { createContext, PropsWithChildren, useState } from 'react';
import { Recognition } from '~/helpers/recognizeFinder';

interface IRecognitionContext {
  recognition: Recognition;
  update(recognition: Recognition): void;
}
export const RecognitionContext = createContext<IRecognitionContext>(
  undefined as any
);

export function RecognitionProvider({ children }: PropsWithChildren<{}>) {
  const [recognition, setRecognition] = useState<Recognition>({
    finder: null,
  });
  return (
    <RecognitionContext.Provider
      value={{
        recognition,
        update: setRecognition,
      }}
    >
      {children}
    </RecognitionContext.Provider>
  );
}
