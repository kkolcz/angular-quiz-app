import { IQuestion } from './question.model';

export interface IQuiz {
  id: number;
  title: string;
  description: string;
  category: string;
  questions: IQuestion[];
}
