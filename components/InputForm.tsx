
import React from 'react';
import { GenerateIcon } from './Icons';

interface InputFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a technology, concept, or problem..."
        disabled={isLoading}
        className="w-full h-28 p-4 pr-40 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none leading-relaxed disabled:opacity-50"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <GenerateIcon className="w-5 h-5" />
            <span>Generate</span>
          </>
        )}
      </button>
    </div>
  );
};
