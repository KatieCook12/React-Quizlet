export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface QuizFilters {
  difficulty?: string;
  category?: string;
}

export interface OpenTDBItem {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface OpenTDBResponse {
  results: OpenTDBItem[];
}
