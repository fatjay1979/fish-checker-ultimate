'use server';
import OpenAI from 'openai';

export async function testWordPressConnection(wpUrl: string, wpUser: string, wpAppPassword: string, cptSlug: string) {
  try {
    const authHeader = `Basic ${Buffer.from(`${wpUser}:${wpAppPassword}`).toString('base64')}`;
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/${cptSlug}?per_page=1`, {
      headers: { 'Authorization': authHeader },
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        success: false,
        error: `HTTP ${res.status}: ${text.substring(0, 200)}`
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: `Verbindung erfolgreich! ${Array.isArray(data) ? data.length : 0} Posts gefunden.`,
      data: { postCount: Array.isArray(data) ? data.length : 0 }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function testOpenAIConnection(apiKey: string) {
  try {
    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say "API works!"' }],
      max_tokens: 10,
    });

    return {
      success: true,
      message: `OpenAI verbunden! Model: ${response.model}`,
      data: { model: response.model, response: response.choices[0].message.content }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function testPerplexityConnection(apiKey: string) {
  try {
    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.perplexity.ai'
    });

    const response = await client.chat.completions.create({
      model: 'sonar',
      messages: [{ role: 'user', content: 'Say "API works!"' }],
      max_tokens: 10,
    });

    return {
      success: true,
      message: `Perplexity verbunden! Model: ${response.model}`,
      data: { model: response.model, response: response.choices[0].message.content }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}