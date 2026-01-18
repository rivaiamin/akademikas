
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getFinancialSummary = async (data: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analisis data keuangan kampus berikut dan berikan ringkasan eksekutif 3 kalimat saja yang sangat profesional: ${data}`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Gagal memuat ringkasan cerdas.";
  }
};

export const suggestJournalEntry = async (description: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a double-entry journal for this transaction: "${description}". 
      Return the COA accounts (e.g., '1-1002 Cash', '5-1002 Electricity Expense') and which one is Debit/Credit.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rows: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  account: { type: Type.STRING },
                  description: { type: Type.STRING },
                  debit: { type: Type.NUMBER },
                  credit: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"rows": []}');
  } catch (error) {
    console.error("AI Error:", error);
    return { rows: [] };
  }
};
