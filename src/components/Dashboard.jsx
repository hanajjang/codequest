import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { missions } from '../data/missions'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { nickname, level, xp, completedProjects, learningMinutes, startTimer, stopTimer } = useUserStore()

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [])

  const progressPercent = (xp % 1000) / 10
  const hours = Math.floor(learningMinutes / 60)
  const minutes = learningMinutes % 60

  const getLevelInfo = () => {
    const icons = ['🌱', '🌿', '🌳', '🌲', '🏔️']
    const names = ['새싹', '나무', '숲', '마스터', '전설']
    const descriptions = [
      '코딩을 시작한 초보자',
      '기본을 다지는 학습자',
      '실력을 쌓는 개발자',
      '숙련된 프로그래머',
      '전설적인 마스터'
    ]
    
    const idx = Math.min(level - 1, 4)
    return {
      icon: icons[idx],
      name: names[idx],
      description: descriptions[idx],
      nextLevel: level + 1,
      xpForNext: (level + 1) * 1000
    }
  }

  const levelInfo = getLevelInfo()

  const handleProjectClick = (projectId) => {
    navigate(`/workspace/${projectId}`)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>{nickname}님의 학습 현황</h1>
            <p>{new Date().toLocaleDateString('ko-KR')}</p>
          </div>
          <div className="header-buttons">
            <button className="btn-roadmap" onClick={() => navigate('/roadmap')}>
              🗺️ 로드맵
            </button>
            <button className="btn-settings" onClick={() => navigate('/settings')}>
              ⚙️ 설정
            </button>
          </div>
        </div>

        <div className="main-grid">
          {/* 레벨 카드 */}
          <div className="card">
            <p className="card-label">학습 진행도</p>

            <div className="level-progression">
              {[1, 2, 3, 4, 5].map((l) => (
                <div key={l} className={`level-icon ${l <= level ? 'active' : l === level + 1 ? 'next' : 'locked'}`}>
                  <span style={{ fontSize: l <= level ? '48px' : l === level + 1 ? '60px' : '48px' }}>
                    {['🌱', '🌿', '🌳', '🌲', '🏔️'][l - 1]}
                  </span>
                  <p>{['새싹', '나무', '숲', '마스터', '전설'][l - 1]}</p>
                </div>
              ))}
            </div>

            <div className="level-status">
              <h2 className="level-display">Lv. {level}</h2>
              <p className="level-name">{levelInfo.name}</p>
              <p className="level-desc">{levelInfo.description}</p>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">레벨 진행도</span>
                <span className="progress-xp">{xp % 1000} / 1000 XP</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="level-goal">다음 레벨까지 {levelInfo.xpForNext - xp} XP 필요</p>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="card">
            <p className="card-label">학습 통계</p>

            <div className="stats-grid">
              <div className="stat-item blue">
                <p>완료한 프로젝트</p>
                <h3>{completedProjects.length}</h3>
                <span className="stat-unit">개</span>
              </div>
              <div className="stat-item green">
                <p>완료한 미션</p>
                <h3>{completedProjects.length * 3}</h3>
                <span className="stat-unit">개</span>
              </div>
              <div className="stat-item orange">
                <p>총 학습시간</p>
                <h3>{hours}</h3>
                <span className="stat-unit">시간 {minutes}분</span>
              </div>
              <div className="stat-item purple">
                <p>획득한 배지</p>
                <h3>{completedProjects.length * 2}</h3>
                <span className="stat-unit">개</span>
              </div>
            </div>

            <div className="recent-activity">
              <p className="activity-label">학습 기록</p>
              <div className="activity-list">
                <p>✅ 완료한 프로젝트: {completedProjects.length}개</p>
                <p>⏱️ 총 학습시간: {hours}시간 {minutes}분</p>
                <p>🔥 현재 레벨: {levelInfo.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 프로젝트 카드 */}
        <div className="card full-width">
          <div className="card-header">
            <h2>학습할 프로젝트</h2>
            <button className="btn-link" onClick={() => navigate('/roadmap')}>
              전체 로드맵 →
            </button>
          </div>

          <div className="projects-grid">
            {missions.slice(0, 6).map((mission) => (
              <div
                key={mission.id}
                className={`project-card ${completedProjects.includes(mission.id) ? 'completed' : ''}`}
                onClick={() => handleProjectClick(mission.id)}
              >
                <p className="project-status">
                  {completedProjects.includes(mission.id) ? '✅ 완료' : '📚 진행중'}
                </p>
                <p className="project-title">{mission.icon} {mission.title}</p>
                <p className="project-time">⏱️ {mission.estimatedTime}분</p>
                <p className="project-xp">⭐ +{mission.rewards.xp} XP</p>
                <div className="project-bar">
                  <div
                    className="project-fill"
                    style={{
                      width: completedProjects.includes(mission.id) ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
