import { GoogleGenAI, Type } from "@google/genai";
import { ProjectIdea, Difficulty } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A creative and concise title for the project idea.",
        },
        description: {
          type: Type.STRING,
          description: "A detailed, one-paragraph description of the project, explaining its purpose and core features.",
        },
        technologies: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: "A list of 3 to 5 key technologies or languages that would be suitable for implementing this project.",
        },
        difficulty: {
            type: Type.STRING,
            enum: [Difficulty.Beginner, Difficulty.Intermediate, Difficulty.Advanced],
            description: "The estimated difficulty level for the project."
        },
        steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5-7 actionable, high-level steps to guide the developer in building the project from start to finish."
        }
      },
      required: ["title", "description", "technologies", "difficulty", "steps"],
    },
};

export const generateProjectIdeas = async (topic: string, difficulty: Difficulty): Promise<ProjectIdea[]> => {
    try {
        const prompt = `
            Based on the following topic, generate 3 distinct and creative project ideas suitable for a developer with a '${difficulty}' skill level.
            For each idea, provide a title, a detailed one-paragraph description, a list of 3-5 relevant technologies, the specified difficulty level ('${difficulty}'), and a list of 5-7 high-level, actionable steps to build the project.
            Ensure your response strictly adheres to the provided JSON schema.

            Topic: "${topic}"
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
                topP: 0.9,
            },
        });
        
        const jsonText = response.text.trim();
        const ideas = JSON.parse(jsonText);

        return ideas as ProjectIdea[];

    } catch (error) {
        console.error("Error generating project ideas:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};