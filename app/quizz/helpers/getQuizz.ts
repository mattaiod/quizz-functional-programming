export default async function getQuizz(quizzId: number): Promise<JSON> {
  const quizz = await fetch(`http://localhost:3001/quizz/${quizzId}`).then(
    (res) => res.json(),
  );
  return quizz;
}
