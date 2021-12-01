import classNames from 'classnames';
import { PropsWithChildren } from 'react';

interface Props {
  vertical?: 'start' | 'center' | 'end';
}

export default function Main({
  vertical = 'center',
  children,
}: PropsWithChildren<Props>) {
  const justify = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[vertical];
  return (
    <main
      className={classNames('h-full flex flex-col items-center gap-8', justify)}
    >
      {children}
    </main>
  );
}
