import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
    isAuthenticated: null,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    userAuth:null,
    setUserAuth: (userAuth) => set({ userAuth }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (isOpen) => set({ isOpen }),
}))