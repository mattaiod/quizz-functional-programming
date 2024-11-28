import { Divider, Heading, Stack, theme } from '@chakra-ui/react';
import QuizzQuestion from './Question';

export type ItemQuizz = {
  theme: string;
  question: string;
  options: string[];
  correct: string | string[];
};

export default function Quizz({ quizz }: { quizz: ItemQuizz[] }) {
  return (
    <>
      <Heading as="h1" size="2xl" className="mb-8">
        {quizz[0]?.theme}
      </Heading>
      <Divider className="mb-12" />
      <Stack spacing={12}>
        {quizz.map((item) => (
          <>
            <QuizzQuestion quizzItem={item} />
            <Divider />
          </>
        ))}
      </Stack>
    </>
  );
}
