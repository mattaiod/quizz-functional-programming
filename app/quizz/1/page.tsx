import getQuizz from '../helpers/getQuizz';

export default function Page() {
  const quizzJSON = getQuizz(1);
  return <>{quizzJSON}</>;
}
