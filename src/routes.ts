import express from "express";
import { A, B, D, F, G, pipe, S } from "@mobily/ts-belt";
import fs from "fs";
import path from "path";

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

const normalizeUrl = (str: string): string => {
  return str
    .normalize("NFD") // Normalize to decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9\-]/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

// Exemple d'utilisation
const originalString = "Fonctions-d’Ordre-Superieur-et-Fonctions-Pures";
const normalizedString = normalizeUrl(originalString);
console.log(normalizedString); // "Fonctions-d-Ordre-Superieur-et-Fonctions-Pures"

const fullRoutesAndQuizz = pipe(
  D.toPairs(buildArrayQuizzOptimized()),
  A.map(([theme, itemQuizz]) => {
    return [normalizeUrl(theme), itemQuizz] as const;
  }),
  (items) => {
    console.log("");
    console.log("Routes API : ");
    console.log("");
    A.forEach(items, ([theme, itemQuizz]) => {
      console.log("->" + "/quizz/" + theme);
    });
    return items;
  },
);

const keysRoutes = A.map(fullRoutesAndQuizz, ([theme, _]) => theme);

export const makeRouteServer = (app: express.Application) => {
  // Route de base pour tester le serveur
  app.get("/", (req, res) => {
    const menuHtml = `
    <html>
      <head>
        <title>API Menu</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
          }
          h1 {
            color: #333;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #fff;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          a {
            text-decoration: none;
            color: #007bff;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>API Menu</h1>
        <ul>
          ${keysRoutes.map((route) => `<li><a href="/quizz/${route}">${route}</a></li>`).join("")}
        </ul>
      </body>
    </html>
    `;
    res.send(menuHtml);
  });

  A.forEach(fullRoutesAndQuizz, ([theme, itemQuizz]) => {
    const questionsHtml = `
    <html>
      <head>
        <title>Quizz ${theme}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
          }
          h1 {
            color: #333;
          }
          h2 {
            color: #555;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #fff;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
          p {
            margin: 10px 0 0;
            padding: 10px;
            background-color: #e9ecef;
            border-radius: 5px;
          }
          .back-button {
            margin-top: 20px;
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
          }
          .back-button:hover {
            background-color: #0056b3;
          }
          .back-home {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
          }
          .back-home:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <a href="/" class="back-home">Back Home</a>
        <h1>Quizz ${theme}</h1>
        <ul>
          ${A.mapWithIndex(
            itemQuizz,
            (index, item) => `
            <li>
              <h2>${item.question}</h2>
              <ul>
                ${item.options
                  .map(
                    (option) => `
                  <li>${option}</li>
                `,
                  )
                  .join("")}
              </ul>
              <button onclick="toggleAnswer(${index})" id="btn-${index}">Show Answer</button>
              <p id="answer-${index}" style="display:none;">Correct Answer: ${item.correct}</p>
            </li>
          `,
          ).join("")}
        </ul>
        <a href="/" class="back-button">Retour</a>
        <script>
            function toggleAnswer(index) {
                const answer = document.getElementById('answer-' + index);
                const button = document.getElementById('btn-' + index);
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    button.textContent = 'Hide Answer';
                } else {
                    answer.style.display = 'none';
                    button.textContent = 'Show Answer';
                }
            }
        </script>
      </body>
    </html>
    `;

    app.get(`/quizz/${theme}`, (req, res) => {
      console.log(`GET /quizz/${theme}`);
      res.send(questionsHtml);
    });
  });
};
