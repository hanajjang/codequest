import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { missions } from '../data/missions'
import { analyzeCode, getChatResponse } from '../lib/gemini'
import { useUserStore } from '../store/userStore'
import '../styles/Workspace.css'

export default function Workspace() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { addXP, completeProject } = useUserStore()
  const [isResizing, setIsResizing] = useState(false)
  const [leftWidth, setLeftWidth] = useState(38)
  const containerRef = useRef(null)
  const chatEndRef = useRef(null)

  const mission = missions.find((m) => m.id === projectId)
  const [currentStep, setCurrentStep] = useState(0)
  const [code, setCode] = useState(mission?.steps[0]?.template || '')
  const [messages, setMessages] = useState([
    {
      type: 'mentor',
      text: `안녕하세요! 이 미션에서는 ${mission?.steps[0]?.concepts?.[0] || '개념'}을 배울 거예요.`
    },
    {
      type: 'mentor',
      text: mission?.steps[0]?.description
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')

  const step = mission?.steps[currentStep]

  useEffect(() => {
    if (!step) return
    setCode(step.template)
  }, [currentStep])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleMouseDown = (e) => {
    setIsResizing(true)
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return
      const container = containerRef.current
      const newWidth = (e.clientX / container.clientWidth) * 100
      if (newWidth > 20 && newWidth < 60) {
        setLeftWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing])

  const handleChatSend = async () => {
    if (!chatInput.trim()) return

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: chatInput }
    ])

    setIsChatLoading(true)
    const userQuestion = chatInput
    setChatInput('')

    try {
      const response = await getChatResponse(
        userQuestion,
        mission.language,
        step.description,
        step.concepts
      )

      setMessages((prev) => [
        ...prev,
        { type: 'mentor', text: response }
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'mentor', text: '죄송합니다. 다시 시도해주세요.' }
      ])
    }

    setIsChatLoading(false)
  }

  const handleRun = async () => {
    setIsAnalyzing(true)
    setTerminalOutput('$ Analyzing code...')

    const result = await analyzeCode(
      code,
      mission.language,
      step.description
    )

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: 'Run 버튼을 눌렀습니다.' },
      {
        type: 'mentor',
        text: result.feedback,
        isCorrect: result.isCorrect
      }
    ])

    if (result.isCorrect) {
      setTerminalOutput(
        `$ gcc main.c -o main\n$ ./main\n${step.expectedOutput}\n✅ Success!`
      )
    } else {
      setTerminalOutput(`❌ ${result.feedback}`)
    }

    setIsAnalyzing(false)
  }

  const handleSubmit = () => {
    if (currentStep < mission.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setMessages([
        {
          type: 'mentor',
          text: `좋습니다! 다음 단계로 넘어갔습니다.`
        },
        {
          type: 'mentor',
          text: mission.steps[currentStep + 1]?.description
        }
      ])
    } else {
      addXP(mission.rewards.xp)
      completeProject(projectId)
      alert('미션 완료! 🎉')
      navigate('/dashboard')
    }
  }

  const handleReset = () => {
    setCode(step.template)
    setMessages([
      {
        type: 'mentor',
        text: `코드가 초기화되었습니다. 다시 시작해보세요!`
      }
    ])
  }

  const handleSave = () => {
    alert('코드가 저장되었습니다! 📝')
  }

  if (!mission) return <div>미션을 찾을 수 없습니다.</div>

  return (
    <div className="workspace" ref={containerRef}>
      <div className="workspace-panel left" style={{ width: `${leftWidth}%` }}>
        <div className="workspace-header">
          <div className="mentor-avatar">AI</div>
          <div>
            <h2>AI 멘토</h2>
            <p>실시간 코드 리뷰</p>
          </div>
        </div>

        <div className="chat-area">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type}`}>
              {msg.type === 'mentor' && <span className="avatar">🤖</span>}
              {msg.type === 'user' && <span className="avatar">👤</span>}
              <div className={`bubble ${msg.isCorrect ? 'correct' : msg.isCorrect === false ? 'incorrect' : ''}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="message mentor">
              <span className="avatar">🤖</span>
              <div className="bubble loading">
                <p>생각 중입니다...</p>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="질문 입력..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isChatLoading && handleChatSend()}
            disabled={isChatLoading}
          />
          <button onClick={handleChatSend} disabled={isChatLoading}>
            {isChatLoading ? '...' : '전송'}
          </button>
        </div>
      </div>

      <div className="resizer" onMouseDown={handleMouseDown}></div>

      <div className="workspace-panel right" style={{ width: `${100 - leftWidth}%` }}>
        <div className="editor-header">
          <div className="editor-title">
            <span className="lang-badge">{mission.language}</span>
            <h3>{mission.title}</h3>
            <p>Step {currentStep + 1}: {step?.title}</p>
          </div>
          <div className="editor-info">
            <span>{mission.language}</span>
            <span style={{ color: '#16A34A' }}>● 저장됨</span>
          </div>
        </div>

        <div className="editor-container">
          <div className="line-numbers">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="terminal">
          <div className="terminal-header">
            <span>📤 터미널 출력</span>
            <button className="clear-btn">Clear</button>
          </div>
          <div className="terminal-output">
            <pre>{terminalOutput}</pre>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-run" onClick={handleRun} disabled={isAnalyzing}>
            {isAnalyzing ? '분석 중...' : '▶ Run (Ctrl+Enter)'}
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            ✅ {currentStep === mission.steps.length - 1 ? '완료' : '다음'}
          </button>
          <button className="btn-save" onClick={handleSave}>
            💾 저장
          </button>
          <button className="btn-reset" onClick={handleReset}>
            ↩ 리셋
          </button>
        </div>
      </div>
    </div>
  )
}
