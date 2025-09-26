// FIX: Implemented Gemini service to generate ideas, resolving "Cannot find name" errors.
import { GoogleGenAI, Type } from "@google/genai";
import { Idea, Difficulty } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A short, catchy title for the project idea.",
      },
      description: {
        type: Type.STRING,
        description: "A detailed explanation of the project idea, its purpose, and potential features.",
      },
      tags: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of relevant technologies, concepts, or keywords.",
      },
      steps: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of actionable, step-by-step instructions to build the project.",
      },
      difficulty: {
        type: Type.STRING,
        description: "The difficulty level of the project: 'Beginner', 'Intermediate', or 'Advanced'.",
      },
      codeSample: {
        type: Type.STRING,
        description: "A small, illustrative code snippet in a relevant language (e.g., JavaScript, Python). Optional.",
      },
    },
    required: ["title", "description", "tags", "steps", "difficulty"],
  },
};

export async function generateIdeas(prompt: string, difficulty: Difficulty, existingTitles: string[] = []): Promise<Idea[]> {
  try {
    let fullPrompt = `Generate 3 innovative and detailed project ideas based on the following topic: "${prompt}" for a developer with a "${difficulty}" skill level. For each idea, you must provide: a title, a comprehensive description, a list of relevant technology tags, the correct difficulty level ('Beginner', 'Intermediate', or 'Advanced'), and a detailed, actionable, step-by-step guide for implementation. Also include an optional brief code sample to illustrate a core concept.`;

    if (existingTitles.length > 0) {
      fullPrompt += `\n\nPlease ensure these new ideas are distinct and different from the ones already provided: "${existingTitles.join('", "')}".`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    // The response is expected to be a JSON array string that can be parsed directly.
    const ideas: Idea[] = JSON.parse(jsonText);
    return ideas;
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw new Error("Failed to generate ideas from the AI model.");
  }
}