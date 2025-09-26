// FIX: Defined the Idea interface to fix "Cannot find name" errors.
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Idea {
  title: string;
  description: string;
  tags: string[];
  steps: string[];
  difficulty: Difficulty;
  codeSample?: string;
}