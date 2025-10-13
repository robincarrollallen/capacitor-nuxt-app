import { type IndexedDBConfig, createIndexedDB, defaultIndexedDB } from "./indexedDB"

export function useIndexedDB(config?: IndexedDBConfig) {
  const db = config ? createIndexedDB(config) : defaultIndexedDB

  /**
   * Set data
   * @param key Key name
   * @param value Value
   * @param expiresIn Expiration time (milliseconds), default never expires
   */
  const set = async <T>(key: string, value: T, expiresIn?: number): Promise<void> => {
    return await db.set(key, value, expiresIn)
  }

  /**
   * Get data
   * @param key Key name
   * @returns Data value or null (if not exists or expired)
   */
  const get = async <T>(key: string): Promise<T | null> => {
    return await db.get<T>(key)
  }

  /**
   * Delete data
   * @param key Key name
   */
  const remove = async (key: string): Promise<void> => {
    return await db.delete(key)
  }

  /**
   * Clear all data
   */
  const clear = async (): Promise<void> => {
    return await db.clear()
  }

  /**
   * Get all key names
   */
  const keys = async (): Promise<string[]> => {
    return await db.keys()
  }

  /**
   * Check if key exists and not expired
   * @param key Key name
   */
  const has = async (key: string): Promise<boolean> => {
    return await db.has(key)
  }

  /**
   * Get data size
   */
  const size = async (): Promise<number> => {
    return await db.size()
  }

  /**
   * Clean up expired data
   */
  const cleanup = async (): Promise<void> => {
    return await db.cleanup()
  }

  /**
   * Close database connection
   */
  const close = (): void => {
    db.close()
  }

  return {
    set,
    get,
    remove,
    clear,
    keys,
    has,
    size,
    cleanup,
    close,
  }
}

// Export types
export type { IndexedDBConfig }
