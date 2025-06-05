// ia-utils.ts
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google-ai/generativelanguage';

// Função para gerar uma pergunta usando a API OpenRouter
export async function generateQuestionOpenRouter(apiKey: string, prompt: string) {
  const openai = new OpenAI({ apiKey: apiKey, baseURL: 'https://openrouter.ai/api/v1' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/Mistral-7B-Instruct-v0.2', // Substitua pelo modelo desejado
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    console.log(completion.choices[0]);
    return completion.choices[0].message?.content;
  } catch (error) {
    console.error('Erro ao gerar pergunta com OpenRouter:', error);
    return null;
  }
}

// Função para gerar uma pergunta usando a API Google AI Studio (PaLM API)
export async function generateQuestionGoogleAI(apiKey: string, prompt: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' }); // Substitua pelo modelo desejado

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.error('Erro ao gerar pergunta com Google AI Studio:', error);
    return null;
  }
}