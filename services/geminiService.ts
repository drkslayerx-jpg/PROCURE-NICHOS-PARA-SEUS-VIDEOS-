import { GoogleGenAI } from "@google/genai";
import { NicheResult, VideoIdea, Region, Category } from "../types";

// Inicialização segura do cliente para evitar crash ao carregar o módulo no navegador
const getAiClient = () => {
  const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) 
    ? process.env.API_KEY 
    : ''; 
  return new GoogleGenAI({ apiKey });
};

// Helper to extract JSON from markdown code blocks if necessary
const extractJson = (text: string): any => {
  try {
    // First try standard parse
    return JSON.parse(text);
  } catch (e) {
    // Try to find markdown code blocks
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e2) {
        console.error("Failed to parse extracted JSON block", e2);
      }
    }
    // Fallback: try to find array brackets
    const arrayMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (arrayMatch) {
        try {
            return JSON.parse(arrayMatch[0]);
        } catch (e3) {
            console.error("Failed to parse array match", e3);
        }
    }
    throw new Error("Could not parse JSON response from Gemini.");
  }
};

export const searchViralNiches = async (
  category: Category,
  region: Region,
  customQuery?: string
): Promise<NicheResult[]> => {
  const ai = getAiClient();
  const query = customQuery || category;
  
  const prompt = `
    Atue como um especialista em "Canal Dark" (Canais onde o criador não aparece) e Storytelling para YouTube.
    
    Contexto:
    - Região: ${region}
    - Categoria de História: ${query}
    
    Objetivo:
    Encontre 5 sub-nichos virais específicos dentro desse tema que sejam perfeitos para canais de histórias narradas.
    Foque em temas com alto CPM ou alta retenção (watch time).
    
    Instruções:
    1. Pesquise tendências atuais de narrativa e documentários no YouTube.
    2. Identifique sub-nichos "Oceano Azul" ou tendências crescentes.
    3. O foco deve ser em conteúdo narrativo (histórias, casos, lendas, fatos).

    Formato de Saída (JSON Obrigatório):
    Retorne APENAS um array JSON puro.
    Estrutura do objeto no array:
    {
      "name": "Nome do Sub-Nicho (Específico)",
      "description": "O que é contado e qual o estilo visual (ex: animação whiteboad, stock footage, imagens IA)",
      "trendScore": numero_inteiro (0-100),
      "competitionLevel": "Baixa" | "Média" | "Alta",
      "targetAudience": "Perfil do público",
      "reasonForVirality": "Por que esse tipo de história prende a atenção hoje",
      "exampleChannels": ["Canal Exemplo 1", "Canal Exemplo 2"],
      "monetizationPotential": "Ex: Adsense Alto, Venda de Ebook, Afiliados"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "[]";
    const rawData = extractJson(text);

    // Extract sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks
      ?.map((chunk) => chunk.web ? { title: chunk.web.title || 'Fonte Web', url: chunk.web.uri || '#' } : null)
      .filter((s): s is { title: string; url: string } => s !== null) || [];

    // Map and add unique IDs
    return rawData.map((item: any, index: number) => ({
      ...item,
      id: `niche-${Date.now()}-${index}`,
      searchSources: index === 0 ? sources : [],
    }));

  } catch (error) {
    console.error("Error searching niches:", error);
    throw error;
  }
};

export const generateVideoStrategy = async (nicheName: string, region: Region): Promise<VideoIdea[]> => {
  const ai = getAiClient();
  const prompt = `
    Para um Canal Dark (Faceless) no nicho "${nicheName}" focado na região ${region}, crie 3 roteiros de vídeos virais focados em Storytelling.
    
    O foco deve ser RETENÇÃO máxima.
    
    Retorne um array JSON puro com a seguinte estrutura:
    [
      {
        "title": "Título altamente clicável (Clickbait ético e misterioso)",
        "thumbnailConcept": "Ideia visual dramática para a capa (focada em contraste e curiosidade)",
        "hook": "As primeiras 3 frases da narração para prender o espectador nos primeiros 5 segundos",
        "outline": ["Introdução do Mistério", "Desenvolvimento dos Fatos", "Plot Twist/Clímax", "Conclusão Reflexiva"]
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "[]";
    return extractJson(text);
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
};