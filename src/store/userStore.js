import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  nickname: localStorage.getItem('nickname') || null,
  goal: localStorage.getItem('goal') || null,
  level: parseInt(localStorage.getItem('level') || '1'),
  xp: parseInt(localStorage.getItem('xp') || '0'),
  completedProjects: JSON.parse(localStorage.getItem('completedProjects') || '[]'),
  learningMinutes: parseInt(localStorage.getItem('learningMinutes') || '0'),
  startTime: null,

  setUser: (user) => set({ user }),
  
  setNickname: (nickname) => {
    localStorage.setItem('nickname', nickname)
    set({ nickname })
  },
  
  setGoal: (goal) => {
    localStorage.setItem('goal', goal)
    set({ goal })
  },
  
  startTimer: () => set({ startTime: Date.now() }),
  
  stopTimer: () => {
    const state = useUserStore.getState()
    if (state.startTime) {
      const minutes = Math.floor((Date.now() - state.startTime) / 60000)
      const newTotal = state.learningMinutes + minutes
      localStorage.setItem('learningMinutes', newTotal)
      set({ learningMinutes: newTotal, startTime: null })
    }
  },
  
  addXP: (amount) => set((state) => {
    const newXp = state.xp + amount
    const newLevel = Math.floor(newXp / 1000) + 1
    localStorage.setItem('xp', newXp)
    localStorage.setItem('level', newLevel)
    return { xp: newXp, level: newLevel }
  }),
  
  completeProject: (projectId) => set((state) => {
    const updated = [...state.completedProjects, projectId]
    localStorage.setItem('completedProjects', JSON.stringify(updated))
    return {
      completedProjects: updated
    }
  }),
  
  isProjectCompleted: (projectId) => {
    const state = useUserStore.getState()
    return state.completedProjects.includes(projectId)
  }
}))
