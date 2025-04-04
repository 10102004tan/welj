import { create } from "zustand";

export const useMusicPlayer = create((set, get) => ({
    isPause: false,
    setIsPause: (isPause) => set({ isPause }),
    progress: 0,
    setProgress: (progress) => set({ progress }),
    currentTime: 0,
    setCurrentTime: (currentTime) => set({ currentTime }),
    handlePlay: (audioRef) => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPause(true);
        } else {
            audioRef.current.pause();
            setIsPause(false);
        }
    }
}))