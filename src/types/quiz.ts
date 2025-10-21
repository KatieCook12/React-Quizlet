export type QuizQuestion = {
  question: string;
  options: string[];
  correct_answer: string;
};

export type OpenTDBResponse = {
  response_code: number;
  results: Array<{
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    category: string;
    type: string;
    difficulty: string;
  }>;
};

export type QuizFilters = {
  difficulty?: string;
  category?: string;
};
