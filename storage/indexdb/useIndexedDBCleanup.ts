import { useIndexedDB } from "./useIndexedDB"
import { EXPIRATION_TIME } from "@/enums"

export function useIndexedDBCleanup() {
  const { cleanup } = useIndexedDB()
  let cleanupInterval: NodeJS.Timeout | null = null

  // Start cleanup timer
  const startCleanup = () => {
    cleanup() // Clean up immediately

    // Clean up every hour
    cleanupInterval = setInterval(() => {
      cleanup()
    }, EXPIRATION_TIME.HOUR)
  }

  // Stop cleanup timer
  const stopCleanup = () => {
    if (cleanupInterval) {
      clearInterval(cleanupInterval)
      cleanupInterval = null
    }
  }

  // Manual cleanup
  const manualCleanup = () => {
    cleanup()
  }

  return {
    startCleanup,
    stopCleanup,
    manualCleanup,
  }
}
