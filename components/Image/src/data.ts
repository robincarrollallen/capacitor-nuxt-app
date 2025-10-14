/** Webp cache */
export const webpCache = new Map<string, any>()

/** get or set webp cache */
export const getOrSetWebpCache = <T>(
	key: string,
	factory: () => T
): T => {
	const cached = webpCache.get(key)
	if (cached !== undefined) {
		return cached
	}

	const value = factory()
	webpCache.set(key, value)
	return value
}

/** get or set webp cache (async version) */
export const getOrSetWebpCacheAsync = async <T>(
	key: string,
	factory: () => Promise<T>
): Promise<T> => {
	const cached = webpCache.get(key)
	if (cached !== undefined) {
		return cached
	}

	const value = await factory()
	webpCache.set(key, value)
	return value
}
