import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL, buildSystemPrompt, chatResponseSchema } from './chatbotPrompt';

function getApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

function normalizeProducts(products = []) {
  return products.map((product) => {
    const id = product.id != null ? String(product.id) : '';
    return {
      ...product,
      id,
      link: product.link && product.link.startsWith('#product-')
        ? product.link
        : `#product-${id}`,
    };
  });
}

export async function sendChatbotMessage(userText, productsData) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key missing');

  const systemPrompt = buildSystemPrompt(productsData);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: chatResponseSchema,
    }
  });

  const result = await model.generateContent(userText);
  const botResponseRaw = result.response.text();
  if (!botResponseRaw?.trim()) throw new Error('Empty response');

  const botData = JSON.parse(botResponseRaw);
  return {
    text: botData.text || '',
    products: normalizeProducts(botData.products || []),
  };
}
