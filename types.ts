
export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
}

export interface ProjectIdea {
    title: string;
    description: string;
    technologies: string[];
    difficulty: Difficulty;
}
