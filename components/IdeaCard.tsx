import React from 'react';
import { ProjectIdea, Difficulty } from '../types';
import { CodeBracketIcon, ClipboardListIcon } from './Icons';

interface IdeaCardProps {
  idea: ProjectIdea;
}

const difficultyStyles: Record<Difficulty, { bg: string; text: string; border: string }> = {
    [Difficulty.Beginner]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-700' },
    [Difficulty.Intermediate]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-700' },
    [Difficulty.Advanced]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-700' },
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
    const styles = difficultyStyles[idea.difficulty] || difficultyStyles[Difficulty.Beginner];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-600 hover:shadow-cyan-900/30 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-cyan-400">{idea.title}</h3>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}>
          {idea.difficulty}
        </span>
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed">{idea.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <CodeBracketIcon className="w-5 h-5" />
              Suggested Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {idea.technologies.map((tech, index) => (
              <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <ClipboardListIcon className="w-5 h-5" />
                Project Steps
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                {idea.steps.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                ))}
            </ol>
        </div>
      </div>
    </div>
  );
};