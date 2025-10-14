export const useMarqueeLogic = () => {
	const marqueeList = ref([
		{
			name: 'marquee1',
			content: 'current domain zhu-1.w-x-2-c.com'
		}
	])

	return {
		marqueeList
	}
}
