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
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
      })
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

export const getChatResponse = async (question, language, missionDescription, concepts) => {
  const prompt = `당신은 프로그래밍 튜터입니다. 학생의 질문에 친절하고 자세하게 답변하세요.

언어: ${language}
미션: ${missionDescription}
관련 개념: ${concepts.join(', ')}

학생의 질문: ${question}

답변 규칙:
1. 한국어로 답변하세요
2. 친절하고 격려적인 톤을 사용하세요
3. 구체적인 예시를 들어 설명하세요
4. 2-3 문단으로 간결하게 답변하세요
5. 필요하면 코드 예시도 포함하세요`

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Gemini API')
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    
    return text
  } catch (error) {
    console.error('Gemini API error:', error)
    return '죄송합니다. 다시 시도해주세요.'
  }
}
