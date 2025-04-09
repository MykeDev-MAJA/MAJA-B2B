import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'

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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => 
        set(() => ({
          user,
          isAuthenticated: !!user
        })),

      login: (user) => {
        // Set authentication cookie
        Cookies.set('auth-token', user.id, { expires: 7 }) // expires in 7 days
        set(() => ({
          user,
          isAuthenticated: true
        }))
      },

      logout: () => {
        // Remove authentication cookie
        Cookies.remove('auth-token')
        set(() => ({
          user: null,
          isAuthenticated: false
        }))
        // Redirect to home page
        window.location.href = '/'
      }
    }),
    {
      name: 'user-storage', // nombre único para el almacenamiento
      storage: createJSONStorage(() => localStorage),
    }
  )
)
