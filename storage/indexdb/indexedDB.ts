interface StorageItem<T = any> {
  value: T
  timestamp: number
  expiresAt?: number // Expiration timestamp, undefined means never expires
}

interface IndexedDBConfig {
  dbName: string
  version?: number
  storeName?: string
}

class IndexedDBManager {
  private dbName: string
  private version: number
  private storeName: string
  private db: IDBDatabase | null = null

  constructor(config: IndexedDBConfig) {
    this.dbName = config.dbName
    this.version = config.version || 1
    this.storeName = config.storeName || "keyValueStore"
  }

  /**
   * Initialize database connection
   */
  private async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db)
        return
      }

      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        reject(new Error("Failed to open IndexedDB"))
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "key" })
        }
      }
    })
  }

  /**
   * Set data
   * @param key Key name
   * @param value Value
   * @param expiresIn Expiration time (milliseconds), default never expires
   */
  async set<T>(key: string, value: T, expiresIn?: number): Promise<void> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)

      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiresAt: expiresIn ? Date.now() + expiresIn : undefined,
      }

      let request: IDBRequest

      try {
        request = store.put({ key, ...item })
      }
      catch {
        request = store.put({ key, ...{ ...item, value: JSON.parse(JSON.stringify(value)) } })
      }

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error("Failed to set data"))
    })
  }

  /**
   * Get data
   * @param key Key name
   * @returns Data value or null (if not exists or expired)
   */
  async get<T>(key: string): Promise<T | null> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        if (!result) {
          resolve(null)
          return
        }

        const item: StorageItem<T> = result

        // Check if expired
        if (item.expiresAt && Date.now() > item.expiresAt) {
          this.delete(key) // Automatically delete expired data
          resolve(null)
          return
        }

        resolve(item.value)
      }

      request.onerror = () => reject(new Error("Failed to get data"))
    })
  }

  /**
   * Delete data
   * @param key Key name
   */
  async delete(key: string): Promise<void> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error("Failed to delete data"))
    })
  }

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error("Failed to clear data"))
    })
  }

  /**
   * Get all key names
   */
  async keys(): Promise<string[]> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const keys = request.result as string[]
        resolve(keys)
      }

      request.onerror = () => reject(new Error("Failed to get keys"))
    })
  }

  /**
   * Check if key exists and not expired
   * @param key Key name
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key)
    return value !== null
  }

  /**
   * Get data size
   */
  async size(): Promise<number> {
    const keys = await this.keys()
    return keys.length
  }

  /**
   * Clean up expired data
   */
  async cleanup(): Promise<void> {
    const db = await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.getAll()

      request.onsuccess = () => {
        const items = request.result as Array<{ key: string } & StorageItem>
        const now = Date.now()

        const expiredKeys = items
          .filter(item => item.expiresAt && now > item.expiresAt)
          .map(item => item.key)

        const deletePromises = expiredKeys.map(key => this.delete(key)) // Delete expired data
        Promise.all(deletePromises).then(() => resolve())
      }

      request.onerror = () => reject(new Error("Failed to cleanup"))
    })
  }

  /**
   * Close database connection
   */
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }
}

// Create default instance
export function createIndexedDB(config: IndexedDBConfig) {
  return new IndexedDBManager(config)
}

// Default instance
export const defaultIndexedDB = createIndexedDB({
  dbName: "nuxt-app-storage",
  version: 1,
  storeName: "keyValueStore",
})

// Export types
export type { StorageItem, IndexedDBConfig }
export { IndexedDBManager }
