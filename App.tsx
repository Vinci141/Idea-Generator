
// FIX: Implemented the main App component to resolve "Cannot find name" errors and provide the application structure.
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { IdeaCard } from './components/IdeaCard';
import { Loader } from './components/Loader';
import { generateIdeas } from './services/geminiService';
import { Idea } from './types';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setIdeas([]); // Clear previous ideas

    try {
      const generatedIdeas = await generateIdeas(prompt);
      setIdeas(generatedIdeas);
      setPrompt(''); // Clear input on success
    } catch (e) {
      setError('Sorry, something went wrong while generating ideas. Please try again.');
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
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          {isLoading && <Loader />}
          {error && <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>}
          {!isLoading && ideas.length > 0 && (
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
        </div>
      </main>
    </div>
  );
}

export default App;
