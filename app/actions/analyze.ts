'use server';
import OpenAI from 'openai';
import { cleanMetaData } from '@/lib/utils';

export async function runAnalysis(data: any, options: any) {
  if (!options.apiKey) return { success: false, error: "API Key fehlt" };

  const baseURL = options.engine === 'perplexity' ? 'https://api.perplexity.ai' : undefined;
  const client = new OpenAI({ apiKey: options.apiKey, baseURL });

  const rawMeta = data.meta || data.acf || {};
  const relevantMeta = cleanMetaData(rawMeta);

  const contentSnippet = JSON.stringify({
    PostTitle: data.title?.rendered || data.title,
    PostContent: (data.content?.rendered || "").replace(/<[^>]*>?/gm, '').substring(0, 3000),
    CustomFields: relevantMeta
  });

  try {
    const startTime = Date.now();
    const response = await client.chat.completions.create({
      model: options.model,
      messages: [
        { role: "system", content: options.systemPrompt },
        { role: "user", content: `Analysiere: ${contentSnippet}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      success: true,
      data: result,
      meta: { duration, model: options.model, engine: options.engine }
    };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}