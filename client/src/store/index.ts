import { create } from 'zustand'

type StoreType = {
    darkMode: boolean;
    toggleDarkMode: (e: boolean) => void;
}

export const useAppStore = create<StoreType>((set) => ({
    darkMode: false,
    toggleDarkMode: (mode: boolean) => {
        set(() => ({ darkMode: mode }))
    },
}))