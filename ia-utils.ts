// ia-utils.ts
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google-ai/generativelanguage';

interface ParsedQuestion {
  text: string;
  options: string[];
  answer: number;
}

// Função para gerar uma pergunta usando a API OpenRouter
export async function generateQuestionOpenRouter(apiKey: string, prompt: string, model: string): Promise<ParsedQuestion | null> {
  const openai = new OpenAI({ apiKey: apiKey, baseURL: 'https://openrouter.ai/api/v1' });

  try {
    const completion = await openai.chat.completions.create({
      model: model, // Usa o modelo fornecido
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    const generatedText = completion.choices[0].message?.content;

    if (!generatedText) {
      console.error('Resposta da API OpenRouter está vazia.');
      return null;
    }

    // Expressão regular para analisar a resposta
    const questionRegex = /(.*?)\n1\. (.*?)\n2\. (.*?)\n3\. (.*?)\n4\. (.*?)\nResposta correta: (\d)/;
    const match = generatedText.match(questionRegex);

    if (match && match.length === 7) {
      const text = match[1].trim();
      const options = [match[2].trim(), match[3].trim(), match[4].trim(), match[5].trim()];
      const answer = parseInt(match[6].trim()) - 1; // Ajusta para índice base 0

      return { text, options, answer };
    } else {
      console.error('Formato de resposta inválido da API OpenRouter:', generatedText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao gerar pergunta com OpenRouter:', error);
    return null;
  }
}

// Função para gerar uma pergunta usando a API Google AI Studio (PaLM API)
export async function generateQuestionGoogleAI(apiKey: string, prompt: string): Promise<ParsedQuestion | null> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) {
      console.error('Resposta da API Google AI Studio está vazia.');
      return null;
    }

    // Expressão regular para analisar a resposta
    const questionRegex = /(.*?)\n1\. (.*?)\n2\. (.*?)\n3\. (.*?)\n4\. (.*?)\nResposta correta: (\d)/;
    const match = responseText.match(questionRegex);

    if (match && match.length === 7) {
      const text = match[1].trim();
      const options = [match[2].trim(), match[3].trim(), match[4].trim(), match[5].trim()];
      const answer = parseInt(match[6].trim()) - 1; // Ajusta para índice base 0

      return { text, options, answer };
    } else {
      console.error('Formato de resposta inválido da API Google AI Studio:', responseText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao gerar pergunta com Google AI Studio:', error);
    return null;
  }
}