type ObserverCallback = (isVisible: boolean) => void

// 使用闭包创建管理器
function createLazyObserverManager() {
  let observer: IntersectionObserver | null = null
  const callbacks = new Map<Element, ObserverCallback>()

  const getObserver = () => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = callbacks.get(entry.target)
            if (callback && entry.isIntersecting) {
              callback(true)
              callbacks.delete(entry.target)
              getObserver().unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: "100px",
          threshold: 0.01,
        },
      )
    }
    return observer
  }

  const observe = (element: Element, callback: ObserverCallback) => {
    callbacks.set(element, callback)
    getObserver().observe(element)
  }

  const unobserve = (element: Element) => {
    callbacks.delete(element)
    getObserver().unobserve(element)
  }

  const disconnect = () => {
    observer?.disconnect()
    callbacks.clear()
  }

  return { observe, unobserve, disconnect }
}

const lazyObserverManager = createLazyObserverManager() // 全局单例

export function useLazyObserver() {
  return {
    observe: lazyObserverManager.observe,
    unobserve: lazyObserverManager.unobserve,
  }
}
