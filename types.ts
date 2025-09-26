// FIX: Defined the Idea interface to fix "Cannot find name" errors.
export interface Idea {
  title: string;
  description: string;
  tags: string[];
  steps: string[];
  codeSample?: string;
}