// FIX: Implemented Gemini service to generate ideas, resolving "Cannot find name" errors.
import { GoogleGenAI, Type } from "@google/genai";
import { Idea } from '../types';

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
      codeSample: {
        type: Type.STRING,
        description: "A small, illustrative code snippet in a relevant language (e.g., JavaScript, Python). Optional.",
      },
    },
    required: ["title", "description", "tags", "steps"],
  },
};

export async function generateIdeas(prompt: string): Promise<Idea[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 innovative project ideas based on the following topic: "${prompt}". For each idea, provide a title, a detailed description, a list of relevant technology tags, a list of actionable steps to implement the project, and an optional brief code sample to illustrate a core concept.`,
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