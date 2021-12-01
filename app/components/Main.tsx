import { PropsWithChildren } from 'react';

interface Props {}

export default function Main({ children }: PropsWithChildren<Props>) {
  return (
    <main className="h-full flex flex-col items-center justify-center gap-8">
      {children}
    </main>
  );
}
