import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { missions } from '../data/missions'
import '../styles/Roadmap.css'

export default function Roadmap() {
  const navigate = useNavigate()
  const { completedProjects } = useUserStore()

  const isProjectUnlocked = (projectId) => {
    const project = missions.find((m) => m.id === projectId)
    if (!project?.unlockCondition) return true
    return completedProjects.includes(project.unlockCondition)
  }

  const getProjectStatus = (projectId) => {
    if (completedProjects.includes(projectId)) return 'completed'
    if (isProjectUnlocked(projectId)) return 'available'
    return 'locked'
  }

  const handleProjectClick = (projectId, status) => {
    if (status === 'available' || status === 'completed') {
      navigate(`/workspace/${projectId}`)
    }
  }

  const groupedMissions = {
    region1: missions.filter((m) => m.category.includes('기초')),
    region2: missions.filter((m) => m.category.includes('중급')),
  }

  return (
    <div className="roadmap">
      <div className="roadmap-container">
        <div className="roadmap-header">
          <h1>🗺️ 코드 맵 - 학습 로드맵</h1>
          <p>RPG 게임처럼 각 영역을 정복하며 배우세요</p>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-dot completed"></div>
            <span>완료</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot available"></div>
            <span>진행 중</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot locked"></div>
            <span>잠금 해제 대기</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot future"></div>
            <span>미래 컨텐츠</span>
          </div>
        </div>

        <div className="regions-grid">
          <div className="region">
            <div className="region-header">
              <span className="region-icon">📖</span>
              <h2>Region 1: C의 기초</h2>
            </div>
            <p className="region-desc">변수, 조건문, 반복문 등 기초 문법을 배웁니다</p>

            <div className="missions-list">
              {groupedMissions.region1.map((mission) => {
                const status = getProjectStatus(mission.id)
                return (
                  <div
                    key={mission.id}
                    className={`mission-card ${status}`}
                    onClick={() => handleProjectClick(mission.id, status)}
                  >
                    <div className="mission-header">
                      <h3>{mission.title.split(':')[1]?.trim() || mission.title}</h3>
                      <span className={`badge ${status}`}>
                        {status === 'completed' ? '완료' : status === 'available' ? '진행중' : '잠금'}
                      </span>
                    </div>
                    <p className="mission-desc">{mission.description}</p>
                    <div className="mission-steps">
                      {[1, 2, 3].map((step) => (
                        <span key={step} className={`step-badge ${status === 'completed' ? 'done' : ''}`}>
                          {status === 'completed' ? '✓' : step}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="region-progress">
              <p>Region 1 진행도: 1/2</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          <div className="region">
            <div className="region-header">
              <span className="region-icon">🎮</span>
              <h2>Region 2: 실전 프로젝트</h2>
            </div>
            <p className="region-desc">게임, 자동화, SaaS 등 실전 프로젝트를 만듭니다</p>

            <div className="missions-list">
              {[
                { icon: '🎮', title: '게임 프로젝트', desc: '3D 비행기 게임 만들기' },
                { icon: '🤖', title: '자동화 프로젝트', desc: '업비트 알림 자동화 봇' },
                { icon: '💼', title: 'SaaS 프로젝트', desc: '나만의 AI 회의록 에이전트' }
              ].map((project, i) => (
                <div key={i} className="mission-card future">
                  <div className="mission-header">
                    <h3>{project.icon} {project.title}</h3>
                    <span className="badge future">미래</span>
                  </div>
                  <p className="mission-desc">{project.desc}</p>
                </div>
              ))}
            </div>

            <div className="region-progress">
              <p>Region 2 진행도: 0/3</p>
              <p className="progress-hint">Region 1을 50% 이상 완료하면 활성화됩니다</p>
            </div>
          </div>
        </div>

        <div className="future-regions">
          <div className="region-preview">
            <span className="region-icon">🐍</span>
            <h3>Region 3: Python</h3>
            <p>Python으로 배우는 객체지향과 데이터 처리</p>
            <p className="lock-hint">🔒 C 언어 전체 완료 후 잠금 해제</p>
          </div>

          <div className="region-preview">
            <span className="region-icon">⚡</span>
            <h3>Region 4: JavaScript</h3>
            <p>JavaScript로 배우는 웹 개발과 DOM</p>
            <p className="lock-hint">🔒 모든 C/Python 프로젝트 완료 후 잠금 해제</p>
          </div>
        </div>
      </div>
    </div>
  )
}
