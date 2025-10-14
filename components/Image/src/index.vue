<script setup lang="ts">
import { getOrSetWebpCacheAsync } from "./data"

interface Props {
  src: string
  alt?: string
  fallback?: string
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  round?: boolean
  radius?: string | number
  showError?: boolean
  showLoading?: boolean
  errorIcon?: string
  loadingIcon?: string
}

const componentProps = withDefaults(defineProps<Props>(), {
  alt: "",
  fallback: "",
  fit: "cover",
  round: false,
  radius: 0,
  showError: true,
  showLoading: false,
  errorIcon: "photo-fail",
  loadingIcon: "photo",
})

const imageUrl = ref("")
const imageError = ref(false)

// 简化路径处理
function processPath(src: string) {
  const cleanPath = src.replace(/^[~@]\/+/, "")
  const parts = cleanPath.split("/")
  const fileName = parts.pop()?.replace(/\.webp$/i, "") || ""
  return [...parts, fileName]
}

// 动态导入 WebP 图片
async function importWebp(pathParts: string[]) {
  const importMap = {
    2: () => import(`@/${pathParts[0]}/${pathParts[1]}.webp`),
    3: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}.webp`),
    4: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}.webp`),
    5: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}.webp`),
    6: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}/${pathParts[5]}.webp`),
  }

  const importFn = importMap[pathParts.length as keyof typeof importMap]
  if (!importFn) {
    throw new Error(`Unsupported path depth: ${pathParts.length}`)
  }

  const imageModule = await importFn()
  return imageModule.default
}

/**
 * 加载远程 WebP 图片
 * @param src - WebP 图片的 URL
 */
async function loadRemoteWebp(src: string) {
  try {
    const response = await fetch(src, { method: "HEAD" })
    if (response.ok) {
      return src
    }
    else {
      throw new Error(`Failed to load remote image: ${response.status}`)
    }
  }
  catch (error) {
    console.error(`Failed to load remote WebP: ${src}`, error)
    return componentProps.fallback || ""
  }
}

/**
 * 加载本地 WebP 图片
 * @param src - WebP 图片的路径
 */
async function loadLocalWebp(src: string) {
  return getOrSetWebpCacheAsync(src, async () => {
    // 检查路径是否以 .webp 结尾
    if (!src.toLowerCase().endsWith(".webp")) {
      return src // 如果不是 webp 格式，直接返回原路径
    }

    try {
      const pathParts = processPath(src)
      return await importWebp(pathParts)
    }
    catch (error) {
      console.error(`Failed to load WebP from path: ${src}`, error)
      throw error
    }
  })
}

/**
 * 加载图片
 */
async function loadImage() {
  if (!componentProps.src) {
    return console.warn("WebpImage: src prop is required")
  }

  imageError.value = false

  try {
    const isRemote = componentProps.src.startsWith("/") || componentProps.src.startsWith("http")
    const isLocal = componentProps.src.startsWith("~/") || componentProps.src.startsWith("@/")

    if (isRemote) {
      imageUrl.value = await loadRemoteWebp(componentProps.src)
    }
    else if (isLocal) {
      imageUrl.value = await loadLocalWebp(componentProps.src)
    }
    else {
      console.warn("WebpImage: Invalid src format. Expected remote URL or local path starting with ~/ or @/")
      imageUrl.value = componentProps.src
    }
  }
  catch (error) {
    console.error("Failed to load WebP image:", error)
    imageError.value = true
    imageUrl.value = componentProps.fallback || ""
  }
}

function handleImageError() {
  imageError.value = true
  if (componentProps.fallback) {
    imageUrl.value = componentProps.fallback
  }
}

watch(() => componentProps.src, () => {
  loadImage()
})

onMounted(() => {
  loadImage()
})
</script>

<template>
  <van-image
    v-if="imageUrl"
    :src="imageUrl"
    :alt="componentProps.alt"
    :fit="componentProps.fit"
    :round="componentProps.round"
    :radius="componentProps.radius"
    :show-error="componentProps.showError"
    :show-loading="componentProps.showLoading"
    :error-icon="componentProps.errorIcon"
    :loading-icon="componentProps.loadingIcon"
    class="__image"
    @error="handleImageError"
  >
    <!-- 自定义错误插槽 -->
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>

    <!-- 自定义加载插槽 -->
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </van-image>
</template>

<style scoped>
.__image {
  width: 100%;
  height: 100%;
}
</style>
