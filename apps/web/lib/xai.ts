import OpenAI from 'openai';

let _grok: OpenAI | null = null;

export function getGrok(): OpenAI {
  if (!_grok) {
    _grok = new OpenAI({
      apiKey: process.env.XAI_API_KEY || 'missing',
      baseURL: 'https://api.x.ai/v1',
    });
  }
  return _grok;
}
