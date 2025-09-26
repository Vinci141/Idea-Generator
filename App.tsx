// FIX: Implemented the main App component to resolve "Cannot find name" errors and provide the application structure.
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { IdeaCard } from './components/IdeaCard';
import { Loader } from './components/Loader';
import { generateIdeas } from './services/geminiService';
import { Idea, Difficulty } from './types';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setIdeas([]); // Clear previous ideas for a new search

    try {
      const generatedIdeas = await generateIdeas(prompt, difficulty);
      setIdeas(generatedIdeas);
      setActivePrompt(prompt); // Set the active prompt for "load more"
      setPrompt(''); // Clear input on success
    } catch (e) {
      setError('Sorry, something went wrong while generating ideas. Please try again.');
      console.error(e);
      setActivePrompt('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!activePrompt || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const existingTitles = ideas.map((idea) => idea.title);
      const newIdeas = await generateIdeas(activePrompt, difficulty, existingTitles);
      setIdeas((prevIdeas) => [...prevIdeas, ...newIdeas]);
    } catch (e) {
      setError('Sorry, something went wrong while loading more ideas. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
              AI Idea Generator
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fuel your next project with innovative ideas powered by Gemini.
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <InputForm
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="flex justify-center items-center gap-2 p-1 bg-gray-800 rounded-lg mt-4 max-w-sm mx-auto">
            {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  difficulty === level
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          {isLoading && ideas.length === 0 && <Loader />}
          {error && <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>}
          
          {ideas.length > 0 && (
            <div className="grid gap-8">
              {ideas.map((idea, index) => (
                <IdeaCard key={index} idea={idea} />
              ))}
            </div>
          )}

          {!isLoading && !error && ideas.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              <p className="text-xl">Your generated ideas will appear here.</p>
              <p>Enter a topic above to get started!</p>
            </div>
          )}

          {ideas.length > 0 && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-8 py-3 mx-auto bg-gray-700 text-cyan-300 font-bold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading More...</span>
                  </>
                ) : (
                  <span>Load More Ideas</span>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;