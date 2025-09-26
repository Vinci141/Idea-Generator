import React, { useState, useCallback } from 'react';
import { ProjectIdea, Difficulty } from './types';
import { generateProjectIdeas } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { IdeaCard } from './components/IdeaCard';
import { Loader } from './components/Loader';
import { SparklesIcon, LightBulbIcon } from './components/Icons';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setProjectIdeas([]);

    try {
      const ideas = await generateProjectIdeas(userInput, selectedDifficulty);
      setProjectIdeas(ideas);
    } catch (err) {
      setError('Failed to generate ideas. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Project Idea Generator
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Fuel your creativity. Enter a topic, choose a difficulty, and get unique project ideas powered by AI.
          </p>
        </header>

        <main>
          <InputForm
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="mt-4 flex justify-center items-center gap-3 bg-gray-800/50 border border-gray-700 p-2 rounded-xl">
              <span className="text-sm font-semibold text-gray-400 pr-2">Difficulty:</span>
              {(Object.values(Difficulty) as Difficulty[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50
                    ${selectedDifficulty === level 
                      ? 'bg-cyan-600 text-white shadow-md' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`
                  }
                >
                  {level}
                </button>
              ))}
          </div>


          {isLoading && <Loader />}

          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
              <p className="font-semibold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && projectIdeas.length > 0 && (
            <div className="mt-10 space-y-6">
              {projectIdeas.map((idea, index) => (
                <IdeaCard key={index} idea={idea} />
              ))}
            </div>
          )}
          
          {!isLoading && !error && projectIdeas.length === 0 && (
            <div className="mt-12 text-center">
              <LightBulbIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-400">Your ideas will appear here</h2>
              <p className="text-gray-500">Try typing something like "React and D3", "a mobile app for gardeners", or "machine learning for music".</p>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-600 text-sm">
            <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;