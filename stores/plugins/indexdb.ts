import type { PiniaPluginContext } from "pinia"
import { useIndexedDB } from "@/storage/indexdb/useIndexedDB"

export function piniaIndexedDBPlugin({ store }: PiniaPluginContext) {
  const config = (store as any).$indexedDB || {} // 获取 store 的缓存配置
  const excludeSet = new Set(config.exclude || []) // 创建排除持久化集合
  const { get, set } = useIndexedDB()
  const key = `pinia-${store.$id}`

  // 初始化时恢复
  get(key).then((data) => {
    if (data) {
      store.$patch(data as any)
    }
  })

  // 监听变化自动持久化
  store.$subscribe((_mutation, state) => {
    const stateToCache: any = {}

    // 只缓存非下划线开头的属性
    for (const key in state) {
      if (Object.hasOwn(state, key)
        && !key.startsWith("_")
        && !excludeSet.has(key)) {
        stateToCache[key] = state[key]
      }
    }

    set(key, stateToCache)
  })
}
