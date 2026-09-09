import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const createChatCompletion = async (messages: any[], model = 'gpt-4') => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error)
    throw error
  }
}

export { openai }
