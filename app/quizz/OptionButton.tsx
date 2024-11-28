import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function OptionButton({
  option,
  key,
  isCorrect,
  onClick,
  disabled = false,
}: {
  option: string;
  key: number;
  isCorrect: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(true);
    onClick();
  };
  console.log(disabled);

  return (
    <Button
      onClick={() => handleClick()}
      whiteSpace="normal"
      padding="2"
      height="auto"
      blockSize="auto"
      key={key}
      className={
        selected || disabled ? (isCorrect ? "bg-green-600" : "bg-red-500") : ""
      }
      isDisabled={disabled}
      _disabled={{ opacity: selected ? 0.85 : 0.5 }}
      _hover={{ opacity: 0.8 }}
    >
      {option}
    </Button>
  );
}
