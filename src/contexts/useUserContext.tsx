import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  // Agrega aquí más propiedades del usuario según necesites
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => 
    set(() => ({
      user,
      isAuthenticated: !!user
    })),

  login: (user) => 
    set(() => ({
      user,
      isAuthenticated: true
    })),

  logout: () => 
    set(() => ({
      user: null,
      isAuthenticated: false
    }))
}))
