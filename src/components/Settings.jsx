import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import '../styles/Settings.css'

export default function Settings() {
  const navigate = useNavigate()
  const { nickname, setNickname } = useUserStore()
  const [newNickname, setNewNickname] = useState(nickname)

  const handleSave = () => {
    if (newNickname.trim()) {
      setNickname(newNickname)
      alert('저장되었습니다! ✅')
      navigate('/dashboard')
    }
  }

  const handleLogout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      localStorage.clear()
      navigate('/')
    }
  }

  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-header">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← 돌아가기
          </button>
          <h1>⚙️ 설정</h1>
          <div></div>
        </div>

        <div className="settings-card">
          <h2>프로필 설정</h2>
          <div className="setting-item">
            <label>닉네임</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="닉네임 입력"
            />
            <p className="helper-text">2-15자의 영문/숫자/한글 가능</p>
          </div>

          <div className="setting-buttons">
            <button className="btn-save-settings" onClick={handleSave}>
              저장하기
            </button>
            <button className="btn-cancel" onClick={() => navigate('/dashboard')}>
              취소
            </button>
          </div>
        </div>

        <div className="settings-card">
          <h2>학습 설정</h2>
          <div className="setting-item">
            <label>학습 알림</label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span>매일 알림 받기</span>
            </label>
          </div>

          <div className="setting-item">
            <label>다크 모드</label>
            <label className="toggle">
              <input type="checkbox" />
              <span>다크 모드 사용</span>
            </label>
          </div>
        </div>

        <div className="settings-card danger">
          <h2>위험 영역</h2>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}
