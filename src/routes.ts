import express from "express";
import { A, D, pipe } from "@mobily/ts-belt";
import fs from "fs";
import path from "path";

type Question = {
  theme: string;
  question: string;
  options: string[];
  correct: string;
};

// Fonction pour charger et concaténer les fichiers JSON
const loadJsonFiles = (dir: string): Question[] => {
  const files = fs.readdirSync(dir);
  return files.flatMap((file) => {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data as Question[];
  });
};

const buildArrayQuizzOptimized = (): Record<string, Question[]> => {
  /*TODO:
  - fetch All Json in data folder
  - concat all json in one array
  - shuffle array
  - shuffle letters of answers and chage the letter of answer accordingly
  - make group of array by theme
  - return object with theme as key and array of quizz as value
  */
  return {};
};

export const makeRouteServer = (app: express.Application) => {
  // Route de base pour tester le serveur
  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  pipe(
    D.toPairs(buildArrayQuizzOptimized()),
    A.forEach(([theme, itemQuizz]) => {
      const questionsHtml = `
      <html>
        <head>
          <title>Quizz ${theme}</title>
          </head>
          <body>
            <h1>Quizz ${theme}</h1>
            <ul>
              ${A.map(
                itemQuizz,
                (question) => `
                <li>
                  <h2>${question.question}</h2>
                  <ul>
                    ${question.options.map(
                      (option) => `
                      <li>${option}</li>
                    `,
                    )}
                  </ul>
                </li>
              `,
              )}
            </ul>
          </body>
        </html>
      `;

      app.get(`/quizz/${theme}`, (req, res) => {
        console.log(`GET /quizz/${theme}`);
        res.send(`
          <html>
          <body>
              ${questionsHtml}
              <script>
                  function showAnswer(correct) {
                      document.querySelectorAll('#answer').forEach(answer => {
                          answer.style.display = 'block';
                      });
                  }
              </script>
          </body>
          </html>
      `);
      });
    }),
  );
};
