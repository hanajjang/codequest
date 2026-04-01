import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { missions } from '../data/missions'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { nickname, level, xp, completedProjects } = useUserStore()

  const getLevelIcon = () => {
    if (level === 1) return '🌱'
    if (level === 2) return '🌿'
    if (level === 3) return '🌳'
    return '🌲'
  }

  const getLevelName = () => {
    if (level === 1) return '새싹'
    if (level === 2) return '나무'
    if (level === 3) return '숲'
    return '마스터'
  }

  const nextLevelXp = level * 1000
  const progressPercent = (xp % 1000) / 10

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
          <button className="btn-settings">⚙️ 설정</button>
        </div>

        <div className="main-grid">
          <div className="card">
            <p className="card-label">현재 레벨</p>

            <div className="level-progression">
              {[1, 2, 3, 4].map((l) => (
                <div key={l} className={`level-icon ${l <= level ? 'active' : l === level + 1 ? 'next' : 'locked'}`}>
                  <span style={{ fontSize: l <= level ? '48px' : l === level + 1 ? '60px' : '48px' }}>
                    {l === 1 ? '🌱' : l === 2 ? '🌿' : l === 3 ? '🌳' : '🌲'}
                  </span>
                  <p>{l === 1 ? '새싹' : l === 2 ? '나무' : l === 3 ? '숲' : '마스터'}</p>
                </div>
              ))}
            </div>

            <h2 className="level-display">Lv. {level}</h2>
            <p className="level-desc">{completedProjects.length}개 프로젝트 완료</p>

            <div className="progress-section">
              <div className="progress-label">
                <span>다음 레벨까지</span>
                <span className="progress-xp">{xp % 1000} / 1000 XP</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="card">
            <p className="card-label">학습 통계</p>

            <div className="stats-grid">
              <div className="stat-item blue">
                <p>완료한 프로젝트</p>
                <h3>{completedProjects.length}</h3>
              </div>
              <div className="stat-item green">
                <p>완료한 미션</p>
                <h3>{completedProjects.length * 3}</h3>
              </div>
              <div className="stat-item orange">
                <p>총 학습시간</p>
                <h3>{completedProjects.length * 3}h</h3>
              </div>
              <div className="stat-item purple">
                <p>획득한 배지</p>
                <h3>{completedProjects.length * 2}</h3>
              </div>
            </div>

            <div className="recent-activity">
              <p className="activity-label">최근 활동</p>
              <div className="activity-list">
                <p>✅ 프로젝트 완료</p>
                <p>⭐ 배지 획득</p>
                <p>🔥 연속 학습 중</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card full-width">
          <div className="card-header">
            <h2>다음 학습할 프로젝트</h2>
            <button className="btn-link">전체 로드맵 →</button>
          </div>

          <div className="projects-grid">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className={`project-card ${completedProjects.includes(mission.id) ? 'completed' : ''}`}
                onClick={() => handleProjectClick(mission.id)}
              >
                <p className="project-status">
                  {completedProjects.includes(mission.id) ? '완료' : '진행중'}
                </p>
                <p className="project-title">{mission.icon} {mission.title}</p>
                <p className="project-progress">
                  {completedProjects.includes(mission.id) ? '100% 완료' : '시작하기'}
                </p>
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
