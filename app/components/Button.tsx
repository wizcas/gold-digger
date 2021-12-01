import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className,
  type = 'button',
  ...rest
}: Props) {
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
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
