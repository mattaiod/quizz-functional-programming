import express from "express";
import { A, B, D, F, G, pipe, S } from "@mobily/ts-belt";
import fs from "fs";
import path from "path";
import { themeToLevelMapping } from "./themeToLevelMapping";

type ItemQuizz = {
  theme: string;
  question: string;
  options: string[];
  correct: string | string[];
};

const buildArrayQuizzOptimized = () => {
  /*TODO:
  - fetch All Json in data folder
  - concat all json in one array
  - shuffle array
  - shuffle letters of answers and chage the letter of answer accordingly
  - make group of array by theme
  - return object with theme as key and array of quizz as value
  */

  const listQuestion = loadJsonFiles("src/data");
  const shuffledListQuestion = A.shuffle(listQuestion);

  const listQuestionWithAnswersUpdated = A.map(shuffledListQuestion, (item) => {
    const correctLetter = item.correct;
    if (G.isArray(correctLetter)) {
      return item;
    }
    const allLettersButCorrectLetter = getAllLettersButCorrectLetter(
      correctLetter,
      item.options,
    );

    const newCorrectLetter = getItemInArrayShuffled(allLettersButCorrectLetter);

    if (newCorrectLetter === undefined) {
      throw new Error("newCorrectLetter is undefined");
    }

    const listOptionWithNewOrderAnswer = A.reduce(
      item.options,
      [] as string[],
      (acc, option) => {
        const oldCorrectLetter = item.correct;
        const aNewCorrectLetter = newCorrectLetter;

        const currentLetterCase = option[0];

        if (currentLetterCase === undefined) {
          throw new Error("newCorrectLetter is undefined");
        }

        if (currentLetterCase === oldCorrectLetter) {
          acc.push(aNewCorrectLetter + option.slice(1));
        } else if (currentLetterCase === aNewCorrectLetter) {
          acc.push(oldCorrectLetter + option.slice(1));
        } else {
          acc.push(option);
        }
        return acc;
      },
    );

    const listOptionWithNewOrderAnswerOrderedFromFirstLetterFunctional = A.sort(
      listOptionWithNewOrderAnswer,
      (a, b) => (a[0]! > b[0]! ? 1 : -1),
    );

    return {
      ...item,
      options: listOptionWithNewOrderAnswerOrderedFromFirstLetterFunctional,
      correct: newCorrectLetter,
    };
  });

  const groupQuestionByTheme = A.groupBy(
    listQuestionWithAnswersUpdated,
    (currentItem) => currentItem.theme,
  );

  return groupQuestionByTheme;
};

const getItemInArrayShuffled = (array: readonly string[]) => {
  return A.shuffle(array)[0];
};

// Fonction pour charger et concaténer les fichiers JSON
const loadJsonFiles = (dir: string): ItemQuizz[] => {
  const files = fs.readdirSync(dir);
  return files.flatMap((file) => {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data;
  });
};

const trimAllWhiteSpace = (str: string) => {
  return S.replaceAll(str, " ", "-");
};

const getAllLettersButCorrectLetter = (
  correctLetter: string,
  options: readonly string[],
) => {
  const allLetters = A.map(options, (option) => option[0]!);
  return A.filter(allLetters, (letter) => letter !== correctLetter);
};

export const makeRouteServer = (app: express.Application) => {
  // Route de base pour tester le serveur
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  pipe(
    D.toPairs(buildArrayQuizzOptimized()),
    A.map(([theme, itemQuizz]) => {
      return [trimAllWhiteSpace(theme), itemQuizz] as const;
    }),
    (items) => {
      console.log("");
      console.log("Routes API : ");
      console.log("");
      A.map(items, ([theme, itemQuizz]) => {
        console.log(
          "->" + "/quizz/" + themeToLevelMapping[theme] + " : " + theme,
        );
      });
      return items;
    },
    A.map(([theme, itemQuizz]) => {
      app.get(`/quizz/${themeToLevelMapping[theme]}`, (req, res) => {
        console.log(`GET /quizz/${themeToLevelMapping[theme]}`);
        res.setHeader("Content-Type", "application/json");
        res.json(itemQuizz);
      });
    }),
  );
};
