import { A } from "@mobily/ts-belt";

type Question = {
  theme: string;
  question: string;
  options: string[];
  correct: string;
};

type QuizzGeneral = Question[];

const groupQuestionByTheme = (listQuestion: QuizzGeneral) => {
  return A.groupBy(listQuestion, (currentItem) => currentItem.theme);
};
