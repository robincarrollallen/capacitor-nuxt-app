/** global cache store */
const globalCacheStore = new Map<string, Map<string, any>>()

/** get or create type map */
function getOrCreateTypeMap(type: string): Map<string, any> {
  if (!globalCacheStore.has(type)) {
    globalCacheStore.set(type, new Map())
  }
  return globalCacheStore.get(type)!
}

/** set cache */
export function setCache<T>(type: string, key: string, value: T): void {
  const typeMap = getOrCreateTypeMap(type)
  typeMap.set(key, value)
}

/** get cache */
export function getCache<T>(type: string, key: string): T | undefined {
  const typeMap = globalCacheStore.get(type)
  if (!typeMap)
    return undefined
  return typeMap.get(key) as T | undefined
}

/**
 * get or set cache (sync version)
 * @param type - cache type
 * @param key - cache key
 * @param factory - cache factory
 */
export function getOrSetCache<T>(type: string,	key: string,	factory: () => T): T {
  const cached = getCache<T>(type, key)
  if (cached !== undefined) {
    return cached
  }

  const value = factory()
  setCache(type, key, value)
  return value
}

/** check cache is exist */
export function hasCache(type: string, key: string): boolean {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? typeMap.has(key) : false
}

/** delete cache */
export function deleteCache(type: string, key: string): boolean {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? typeMap.delete(key) : false
}

/** delete cache by type */
export function deleteCacheByType(type: string): boolean {
  return globalCacheStore.delete(type)
}

/** clear cache by type */
export function clearCacheByType(type: string): void {
  const typeMap = globalCacheStore.get(type)
  if (typeMap) {
    typeMap.clear()
  }
}

/** clear all cache */
export function clearCache(): void {
  globalCacheStore.clear()
}

/** get cache keys by type */
export function getCacheKeysByType(type: string): string[] {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? Array.from(typeMap.keys()) : []
}

/** get cache values by type */
export function getCacheValuesByType<T>(type: string): T[] {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? Array.from(typeMap.values()) : []
}

/** get cache entries by type */
export function getCacheEntriesByType<T>(type: string): Array<[string, T]> {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? Array.from(typeMap.entries()) : []
}

/** get cache stats */
export function getCacheStats() {
  const stats = {
    totalTypes: globalCacheStore.size,
    totalItems: 0,
    types: {} as Record<string, number>,
  }

  globalCacheStore.forEach((typeMap, type) => {
    const size = typeMap.size
    stats.types[type] = size
    stats.totalItems += size
  })

  return stats
}

/** get all cache types */
export function getCacheTypes(): string[] {
  return Array.from(globalCacheStore.keys())
}

/** check type is exist */
export function hasCacheType(type: string): boolean {
  return globalCacheStore.has(type)
}

/** get cache type size */
export function getCacheTypeSize(type: string): number {
  const typeMap = globalCacheStore.get(type)
  return typeMap ? typeMap.size : 0
}
