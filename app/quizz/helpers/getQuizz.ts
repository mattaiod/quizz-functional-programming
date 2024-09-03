import { A } from "@mobily/ts-belt";
import { ItemQuizz } from "../Quizz";

export default async function getQuizz(
  quizzId: number,
): Promise<readonly ItemQuizz[]> {
  const quizzResponse = (await fetch(
    `http://localhost:3001/quizz/${quizzId}`,
  ).then((res) => res.json())) as ItemQuizz[];
  const quizz = A.map(quizzResponse, (quizzResponse) => {
    return {
      theme: quizzResponse.theme,
      question: quizzResponse.question,
      options: quizzResponse.options,
      correct: quizzResponse.correct,
    };
  });
  return quizz;
}
