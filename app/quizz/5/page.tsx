"use client";

import { useEffect, useState } from "react";
import getQuizz from "../helpers/getQuizz";
import Quizz, { ItemQuizz } from "../Quizz";

export default function Page() {
  const [quizzList, setQuizzList] = useState<ItemQuizz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuizz(5).then((quizz) => setQuizzList([...quizz]));
    setIsLoading(false);
  }, []);

  return (
    <div className="w-2/3 m-auto">
      {isLoading ? <div>Chargement...</div> : <Quizz quizz={quizzList} />}
    </div>
  );
}
