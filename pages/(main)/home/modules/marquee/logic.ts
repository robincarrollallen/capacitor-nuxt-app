export function useMarqueeLogic() {
  const marqueeList = ref([
    {
      name: "marquee1",
      content: "current domain robincarrollallen.github.io",
    },
  ])

  return {
    marqueeList,
  }
}
