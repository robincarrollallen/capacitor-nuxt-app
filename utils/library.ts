/**
 * 节流函数（异步只支持 async 定义的函数）
 * @param func 异步或同步函数
 * @param delay 延迟时间（ms）
 */
export function throttle(func: (...args: any[]) => any, delay: number) {
  let lastExecTime = 0
  let pendingResult: any = null

  // 预检测是否为 async 函数（只检查一次）
  const isAsyncFunction = func.constructor.name === "AsyncFunction"

  return function (this: any, ...args: any[]) {
    const now = Date.now()

    // 时间窗口外 → 执行并更新结果
    if (now - lastExecTime >= delay) {
      lastExecTime = now
      const result = func.apply(this, args)
      pendingResult = result
      // 如果是 async 函数，但返回的不是 Promise，包一层
      return isAsyncFunction && !(result instanceof Promise)
        ? Promise.resolve(result)
        : result
    }

    // 时间窗口内 → 返回缓存结果
    if (isAsyncFunction) {
      // async 函数始终返回 Promise
      return pendingResult instanceof Promise
        ? pendingResult
        : Promise.resolve(pendingResult)
    }
    // 同步函数直接返回值
    return pendingResult
  }
}

/**
 * @description 驼峰命名
 * @param str 字符串
 */
export function camelCase(str: string = ""): string {
  if (!str || typeof str !== "string")
    return ""
  return str
    .replace(/[^a-z0-9]+(.)/gi, (_match, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, char => char.toLowerCase())
}
