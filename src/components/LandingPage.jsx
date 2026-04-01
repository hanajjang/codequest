import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import '../styles/LandingPage.css'

export default function LandingPage() {
  const [nickname, setNickname] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('🎮')
  const navigate = useNavigate()
  const { setNickname: storeNickname, setGoal } = useUserStore()

  const goals = [
    { icon: '🎮', label: '게임' },
    { icon: '🤖', label: '자동화' },
    { icon: '💼', label: 'SaaS' },
    { icon: '🌐', label: '웹' }
  ]

  const handleStart = () => {
    if (nickname.trim()) {
      storeNickname(nickname)
      setGoal(selectedGoal)
      navigate('/dashboard')
    }
  }

  return (
    <div className="landing">
      <div className="landing-container">
        <div className="landing-header">
          <div className="logo">🚀</div>
          <h1>CodeQuest</h1>
          <p>프로젝트를 만들면서 배우는 코딩 모험</p>
        </div>

        <div className="landing-card">
          <div className="step-indicator">
            <div className="step active"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>

          <h2>당신의 이름을 알려주세요</h2>
          <p>로드맵에서 당신을 어떻게 부를까요?</p>

          <div className="form-group">
            <label>닉네임</label>
            <input
              type="text"
              placeholder="예: 코딩초보자"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
            <p className="helper-text">2-15자의 영문/숫자/한글 가능</p>
          </div>

          <div className="form-group">
            <label>학습 목표</label>
            <div className="goal-grid">
              {goals.map((goal) => (
                <button
                  key={goal.label}
                  className={`goal-btn ${selectedGoal === goal.icon ? 'active' : ''}`}
                  onClick={() => setSelectedGoal(goal.icon)}
                >
                  <span>{goal.icon}</span> {goal.label}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={handleStart}>
            모험 시작하기
          </button>
          <button className="btn-secondary">이미 계정이 있어요</button>
        </div>

        <p className="social-proof">
          이미 <strong>5,234명</strong>이 CodeQuest로 배우고 있어요 ✨
        </p>
      </div>
    </div>
  )
}
