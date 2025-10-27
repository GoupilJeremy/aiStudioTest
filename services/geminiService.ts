import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { MenuItem } from '../types';

/**
 * Initializes GoogleGenAI with the API key from environment variables.
 * @returns An instance of GoogleGenAI.
 */
const getGeminiClient = () => {
  // CRITICAL: process.env.API_KEY is assumed to be pre-configured. Do not prompt user for it.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates sample menu items for a given restaurant using the Gemini API.
 * The model returns a JSON object conforming to the MenuItem array schema.
 * @param restaurantName The name of the restaurant for which to generate menu items.
 * @returns A promise that resolves to an array of MenuItem objects.
 */
export const generateMenuItems = async (restaurantName: string): Promise<MenuItem[]> => {
  const ai = getGeminiClient();
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 affordable and popular menu items for a university student-friendly restaurant called "${restaurantName}". For each item, provide a name, a short description, and a price between 5.00 and 15.00.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.STRING,
                description: 'A unique identifier for the menu item.',
              },
              name: {
                type: Type.STRING,
                description: 'The name of the menu item.',
              },
              description: {
                type: Type.STRING,
                description: 'A short description of the menu item.',
              },
              price: {
                type: Type.NUMBER,
                description: 'The price of the menu item.',
              },
            },
            required: ['id', 'name', 'description', 'price'],
            propertyOrdering: ["id", "name", "description", "price"],
          },
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as MenuItem[];
  } catch (error) {
    console.error("Error generating menu items from Gemini API:", error);
    // Return a fallback or rethrow error
    throw new Error("Failed to generate menu items.");
  }
};
