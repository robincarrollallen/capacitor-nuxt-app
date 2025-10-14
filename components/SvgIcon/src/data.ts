/** SVG cache */
export const svgCache = new Map<string, any>()

/** get or set svg cache */
export const getOrSetSvgCache = <T>(
	key: string,
	factory: () => T
): T => {
	const cached = svgCache.get(key)
	if (cached !== undefined) {
		return cached
	}

	const value = factory()
	svgCache.set(key, value)
	return value
}

/** get or set svg cache (async version) */
export const getOrSetSvgCacheAsync = async <T>(
	key: string,
	factory: () => Promise<T>
): Promise<T> => {
	const cached = svgCache.get(key)
	if (cached !== undefined) {
		return cached
	}

	const value = await factory()
	svgCache.set(key, value)
	return value
}
