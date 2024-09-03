export default function Subtitle({
  text,
  style,
}: {
  text: string;
  style?: string;
}) {
  return <h2 className={'text-2xl text-gray-500 ' + style}>{text}</h2>;
}
