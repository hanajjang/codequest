import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  nickname: localStorage.getItem('nickname') || null,
  goal: localStorage.getItem('goal') || null,
  level: 1,
  xp: 0,
  completedProjects: [],

  setUser: (user) => set({ user }),
  
  setNickname: (nickname) => {
    localStorage.setItem('nickname', nickname)
    set({ nickname })
  },
  
  setGoal: (goal) => {
    localStorage.setItem('goal', goal)
    set({ goal })
  },
  
  addXP: (amount) => set((state) => {
    const newXp = state.xp + amount
    const newLevel = Math.floor(newXp / 1000) + 1
    return { xp: newXp, level: newLevel }
  }),
  
  completeProject: (projectId) => set((state) => ({
    completedProjects: [...state.completedProjects, projectId]
  })),
  
  isProjectCompleted: (projectId) => {
    const state = useUserStore.getState()
    return state.completedProjects.includes(projectId)
  }
}))
