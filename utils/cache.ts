/** global cache store */
const globalCacheStore = new Map<string, Map<string, any>>()

/** get or create type map */
const getOrCreateTypeMap = (type: string): Map<string, any> => {
	if (!globalCacheStore.has(type)) {
		globalCacheStore.set(type, new Map())
	}
	return globalCacheStore.get(type)!
}

/** set cache */
export const setCache = <T>(type: string, key: string, value: T): void => {
	const typeMap = getOrCreateTypeMap(type)
	typeMap.set(key, value)
}

/** get cache */
export const getCache = <T>(type: string, key: string): T | undefined => {
	const typeMap = globalCacheStore.get(type)
	if (!typeMap) return undefined
	return typeMap.get(key) as T | undefined
}

/**
 * get or set cache (sync version)
 * @param type - cache type
 * @param key - cache key
 * @param factory - cache factory
*/
export const getOrSetCache = <T>(
	type: string,
	key: string,
	factory: () => T
): T => {
	const cached = getCache<T>(type, key)
	if (cached !== undefined) {
		return cached
	}

	const value = factory()
	setCache(type, key, value)
	return value
}

/** check cache is exist */
export const hasCache = (type: string, key: string): boolean => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? typeMap.has(key) : false
}

/** delete cache */
export const deleteCache = (type: string, key: string): boolean => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? typeMap.delete(key) : false
}

/** delete cache by type */
export const deleteCacheByType = (type: string): boolean => {
	return globalCacheStore.delete(type)
}

/** clear cache by type */
export const clearCacheByType = (type: string): void => {
	const typeMap = globalCacheStore.get(type)
	if (typeMap) {
		typeMap.clear()
	}
}

/** clear all cache */
export const clearCache = (): void => {
	globalCacheStore.clear()
}

/** get cache keys by type */
export const getCacheKeysByType = (type: string): string[] => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? Array.from(typeMap.keys()) : []
}

/** get cache values by type */
export const getCacheValuesByType = <T>(type: string): T[] => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? Array.from(typeMap.values()) : []
}

/** get cache entries by type */
export const getCacheEntriesByType = <T>(type: string): Array<[string, T]> => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? Array.from(typeMap.entries()) : []
}

/** get cache stats */
export const getCacheStats = () => {
	const stats = {
		totalTypes: globalCacheStore.size,
		totalItems: 0,
		types: {} as Record<string, number>
	}

	globalCacheStore.forEach((typeMap, type) => {
		const size = typeMap.size
		stats.types[type] = size
		stats.totalItems += size
	})

	return stats
}

/** get all cache types */
export const getCacheTypes = (): string[] => {
	return Array.from(globalCacheStore.keys())
}

/** check type is exist */
export const hasCacheType = (type: string): boolean => {
	return globalCacheStore.has(type)
}

/** get cache type size */
export const getCacheTypeSize = (type: string): number => {
	const typeMap = globalCacheStore.get(type)
	return typeMap ? typeMap.size : 0
}
