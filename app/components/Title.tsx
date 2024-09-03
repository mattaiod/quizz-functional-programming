import { CSSProperties } from 'react';

export default function Title({
  text,
  style,
}: {
  text: string;
  style?: string;
}) {
  return <h1 className={'text-6xl font-bold ' + style}>{text}</h1>;
}
