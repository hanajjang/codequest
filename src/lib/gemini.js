const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

console.log('API Key exists:', !!GEMINI_API_KEY)

export const analyzeCode = async (code, language, missionDescription) => {
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set')
    return {
      isCorrect: false,
      feedback: '⚠️ API 키가 설정되지 않았습니다.',
      correction: null
    }
  }

  const prompt = `You are a code mentor. Analyze this ${language} code and provide feedback in Korean.

Mission: ${missionDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Respond ONLY with JSON:
{"isCorrect": boolean, "feedback": "string", "correction": "string or null"}`

  try {
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`
    console.log('Calling Gemini API...')
    
    const response = await fetch(url, {
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

    console.log('API Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    return JSON.parse(text)
  } catch (error) {
    console.error('Gemini error:', error.message)
    return {
      isCorrect: false,
      feedback: `분석 오류: ${error.message}`,
      correction: null
    }
  }
}

export const getChatResponse = async (question, language, missionDescription, concepts) => {
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set')
    return '⚠️ API 키가 설정되지 않았습니다.'
  }

  const conceptsList = Array.isArray(concepts) ? concepts.join(', ') : String(concepts)
  
  const prompt = `프로그래밍 튜터로서 학생의 질문에 답변하세요.

언어: ${language}
미션: ${missionDescription}
개념: ${conceptsList}

질문: ${question}

한국어로 친절하고 구체적으로 2-3문단으로 답변하세요.`

  try {
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`
    console.log('Calling Chat API...')
    
    const response = await fetch(url, {
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

    console.log('Chat API Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Chat API Error:', errorText)
      throw new Error(`Chat Error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates[0].content.parts[0].text.trim()
  } catch (error) {
    console.error('Chat error:', error.message)
    return `오류: ${error.message}`
  }
}
