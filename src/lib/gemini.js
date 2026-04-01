const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export const analyzeCode = async (code, language, missionDescription) => {
  const prompt = `You are a code mentor. Analyze this ${language} code and provide constructive feedback in Korean.

Mission: ${missionDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Please respond ONLY with a JSON object (no markdown, no extra text):
{
  "isCorrect": boolean,
  "feedback": "feedback in Korean (2-3 sentences)",
  "correction": "what to fix or null"
}`

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      console.error('API Error:', response.status)
      throw new Error('API request failed')
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from API')
    }

    const text = data.candidates[0].content.parts[0].text
    
    try {
      const parsed = JSON.parse(text)
      return parsed
    } catch (e) {
      // If JSON parsing fails, extract content
      return {
        isCorrect: false,
        feedback: text.substring(0, 200),
        correction: null
      }
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      isCorrect: false,
      feedback: 'AI 분석에 실패했습니다. API 키를 확인해주세요.',
      correction: null
    }
  }
}

export const getChatResponse = async (question, language, missionDescription, concepts) => {
  const conceptsList = Array.isArray(concepts) ? concepts.join(', ') : String(concepts)
  
  const prompt = `당신은 친절한 프로그래밍 튜터입니다. 학생의 질문에 명확하고 도움이 되게 답변하세요.

[학습 컨텍스트]
- 프로그래밍 언어: ${language}
- 현재 미션: ${missionDescription}
- 관련 개념: ${conceptsList}

[학생의 질문]
${question}

[답변 지침]
1. 한국어로 답변하세요
2. 친절하고 격려적인 톤
3. 구체적인 예시 포함
4. 2-3 문단으로 간결하게
5. 코드 예시가 필요하면 포함
6. 질문과 직접적으로 관련된 답변을 하세요`

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      console.error('Chat API Error:', response.status)
      throw new Error('Chat API request failed')
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from chat API')
    }

    const text = data.candidates[0].content.parts[0].text
    return text.trim()
  } catch (error) {
    console.error('Gemini Chat error:', error)
    return '죄송합니다. 현재 AI 서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
  }
}
