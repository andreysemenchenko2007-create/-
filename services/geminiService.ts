
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, GroundingSource } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiResponse = async (history: ChatMessage[], message: string): Promise<{ text: string, sources?: GroundingSource[] }> => {
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT + "\nВикористовуй Google Search для перевірки фактів або пошуку актуальної інформації, якщо це необхідно для уроку.",
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Вибачте, сталася помилка при отриманні відповіді.";
    
    // Extract grounding chunks for search results
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || 'Джерело',
            uri: chunk.web.uri
          });
        }
      });
    }

    // De-duplicate sources by URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return { text, sources: uniqueSources.length > 0 ? uniqueSources : undefined };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Не вдалося з'єднатися з AI помічником. Перевірте підключення." };
  }
};

export const generateLessonSummary = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Створи короткий конспект (bullet points) для уроку на тему: ${topic}`,
  });
  return response.text;
};
