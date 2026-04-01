const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export const analyzeCode = async (code, language, missionDescription) => {
  const prompt = `You are a code mentor. Analyze this ${language} code and provide constructive feedback.

Mission: ${missionDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
1. Whether the code is correct (YES/NO)
2. Specific feedback (2-3 sentences in Korean)
3. If incorrect, what needs to be fixed

Format your response as JSON:
{
  "isCorrect": boolean,
  "feedback": "string",
  "correction": "string or null"
}`

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }),
      params: {
        key: GEMINI_API_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Gemini API')
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    
    return JSON.parse(text)
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      isCorrect: false,
      feedback: 'AI 분석에 실패했습니다. 다시 시도해주세요.',
      correction: null
    }
  }
}
