import { Button, Heading, Stack } from "@chakra-ui/react";
import { ItemQuizz } from "./Quizz";
import OptionButton from "./OptionButton";
import { useState } from "react";

export default function QuizzQuestion({ quizzItem }: { quizzItem: ItemQuizz }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleClick = (optionLetter: string) => {
    if (selectedOptions.includes(optionLetter)) {
      return;
    }
    setSelectedOptions([...selectedOptions, optionLetter]);
  };
  const correctLength = quizzItem.correct.length;
  return (
    <div>
      <Heading as="h2" size="lg" className="mb-4">
        {quizzItem.question}
      </Heading>
      <Heading as="h2" size="sm" className="mb-4">
        {`${correctLength} bonne${correctLength > 1 ? "s" : ""} réponse${correctLength > 1 ? "s" : ""}`}
      </Heading>
      <Stack direction={["column", "row"]} spacing={4}>
        {quizzItem.options.map((option, index) => {
          const optionLetter = option.slice(0, 1);
          return (
            <OptionButton
              option={option}
              key={index}
              isCorrect={quizzItem.correct.includes(optionLetter)}
              onClick={() => handleClick(optionLetter)}
              disabled={quizzItem.correct.length === selectedOptions.length}
            />
          );
        })}
      </Stack>
    </div>
  );
}
