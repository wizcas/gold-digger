import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { useTransition } from 'remix';
import BeatLoader from 'react-spinners/BeatLoader';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className,
  type = 'button',
  ...rest
}: Props) {
  const t = useTransition();
  const loading = t.state !== 'idle';
  return (
    <button
      type={type}
      className={classNames(
        'flex flex-row justify-center items-center',
        'px-8 py-4',
        'bg-primary-normal hover:bg-primary-light active:bg-primary-vivid',
        'text-light-normal text-lg font-bold',
        'rounded-full',
        'shadow-button transform active:shadow-button-sm active:translate-y-1',
        'relative',
        'transition-all duration-200 ease-in-out',
        className
      )}
      {...rest}
    >
      {loading ? <BeatLoader loading color="currentColor" /> : children}
    </button>
  );
}
