import { CSSProperties, useMemo } from 'react';

interface Props {
  color: string;
  strokeColor: string;
  strokeWidth?: number;
  className?: string;
  children?: string;
  bonus?: boolean;
}
export default function TextWithStroke({
  children,
  color,
  strokeColor,
  strokeWidth = 2,
  className,
  bonus,
}: Props) {
  const style = useMemo(
    () =>
      ({
        WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
        color,
        textShadow: bonus
          ? [
              `${strokeWidth}px ${strokeWidth}px`,
              `-1px -1px`,
              `1px -1px`,
              `-1px 1px`,
              `1px 1px`,
            ]
              .map((dim) => `${dim} 0 ${strokeColor}`)
              .join(',')
          : undefined,
      } as CSSProperties),
    [color, strokeColor, strokeWidth, bonus]
  );
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}
