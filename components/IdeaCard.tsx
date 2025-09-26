// FIX: Implemented the IdeaCard component to display a generated idea, resolving "Cannot find name" errors.
import React from 'react';
import { Idea, Difficulty } from '../types';
import { CodeBlock } from './CodeBlock';

interface IdeaCardProps {
  idea: Idea;
}

const difficultyStyles: Record<Difficulty, { base: string; text: string }> = {
    Beginner: {
        base: 'bg-green-800/50 border-green-500/50',
        text: 'text-green-300',
    },
    Intermediate: {
        base: 'bg-yellow-800/50 border-yellow-500/50',
        text: 'text-yellow-300',
    },
    Advanced: {
        base: 'bg-red-800/50 border-red-500/50',
        text: 'text-red-300',
    },
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const styles = difficultyStyles[idea.difficulty] || difficultyStyles.Beginner;
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/50">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-cyan-400 pr-4">{idea.title}</h3>
            <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${styles.base} ${styles.text}`}>
                {idea.difficulty}
            </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gray-700 text-cyan-300 text-xs font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-300 leading-relaxed">{idea.description}</p>
        
        {idea.steps && idea.steps.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-cyan-300 mb-3">Implementation Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              {idea.steps.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {idea.codeSample && (
            <div className="mt-6">
                 <CodeBlock code={idea.codeSample} />
            </div>
        )}
      </div>
    </div>
  );
};