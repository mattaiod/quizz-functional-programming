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
  return (
    <div>
      <Heading as="h2" size="lg" className="mb-4">
        {quizzItem.question}
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
