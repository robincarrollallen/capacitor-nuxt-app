<script setup lang="ts">
import { getOrSetSvgCacheAsync } from "./data"
import { IMAGE_TYPE, IMAGE_TYPE_VALUES, type ImageType } from "@/enums"

interface Props {
  src?: string
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
  lazy: false,
})

const { observe, unobserve } = useLazyObserver() // 懒加载观察器

const isError = ref(false) // 是否加载失败
const svgContent = ref("") // 存储 SVG 内容
const isLoaded = ref(false) // 是否加载完成
const isVisible = ref(false) // 是否可见
const imageUrl = ref(props.src) // 存储图片 URL
const iconRef = ref<HTMLElement | null>(null) // 存储图标元素
const imageType = ref<ImageType | undefined>(undefined) // 图片类型

/** Check image type */
function checkImageType(src: string) {
  if (/\.svg(?:\?|#|$)/i.test(src)) {
    return IMAGE_TYPE.SVG
  }
  else if (/\.webp(?:\?|#|$)/i.test(src)) {
    return IMAGE_TYPE.WEBP
  }
  return undefined
}

/** Simplified path processing */
function processPath(src: string) {
  const cleanPath = src.replace(/^[~@]\/+/, "")
  const parts = cleanPath.split("/")
  const fileName = parts.pop()?.replace(/\.(svg|webp)$/i, "") || ""
  return [...parts, fileName]
}

/** Simplified dynamic import Image */
async function importImage(pathParts: string[]) {
  const importMap = {
    svg: {
      2: () => import(`@/${pathParts[0]}/${pathParts[1]}.svg?raw`),
      3: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}.svg?raw`),
      4: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}.svg?raw`),
      5: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}.svg?raw`),
      6: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}/${pathParts[5]}.svg?raw`),
    },
    webp: {
      2: () => import(`@/${pathParts[0]}/${pathParts[1]}.webp`),
      3: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}.webp`),
      4: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}.webp`),
      5: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}.webp`),
      6: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}/${pathParts[5]}.webp`),
    },
  }

  const importFn = importMap[imageType.value as keyof typeof importMap][pathParts.length as keyof typeof importMap[keyof typeof importMap]]
  if (!importFn) {
    console.error(`Unsupported path depth: ${pathParts.length}`)
  }

  const imageModule = await importFn()
  return imageModule.default
}

/** Check if the src is a base64 svg */
function isSvgBase64(src: string): boolean {
  return /^data:image\/svg\+xml/i.test(src)
}

/** Check if the src is a base64 image */
function isBase64(src: string): boolean {
  return /^data:image\//i.test(src)
}

/** Load base64 svg */
async function loadSvgBase64(src: string) {
  const [header, data] = src.split(",")
  if (!data) {
    return console.error("Invalid SVG data URL format")
  }

  imageType.value = IMAGE_TYPE.SVG

  const svgRawContent = header.includes("base64")
    ? atob(data) // Base64 编码的 SVG
    : decodeURIComponent(data) // URL 编码或明文 SVG

  svgContent.value = getSvgPurifyContent(svgRawContent) // 清理并赋值给 svgContent（用于 v-html）
  isVisible.value = true
}

/**
 * Load remote SVG file
 * @param src - The src of the SVG file
 */
async function loadRemote(src: string) {
  try {
    const response = await fetch(src)
    imageType.value = checkImageType(src)

    if (imageType.value === IMAGE_TYPE.SVG) {
      const content = await response.text()
      // ✅ 使用 DOMPurify 清理
      svgContent.value = getSvgPurifyContent(content)
    }
    isVisible.value = true
  }
  catch (error) {
    console.error(`Failed to load remote SVG: ${src}`, error)
  }
}

/**
 * Load local SVG file
 * @param src - The src of the SVG file
 */
async function loadLocal(src: string) {
  imageType.value = checkImageType(src)

  imageUrl.value = svgContent.value = await getOrSetSvgCacheAsync(src, async () => {
    if (IMAGE_TYPE_VALUES.includes(imageType.value)) {
      try {
        const pathParts = processPath(src)
        return await importImage(pathParts)
      }
      catch (error) {
        console.error(`Failed to load SVG from path: ${src}`, error)
      }
    }
  })

  if (!imageUrl.value) {
    isError.value = true
  }
  isVisible.value = true
}

/** Load SVG */
async function loadSvg() {
  try {
    if (props.src.startsWith("/") || props.src.startsWith("http")) {
      loadRemote(props.src)
    }
    else if (props.src.startsWith("~/") || props.src.startsWith("@/")) {
      loadLocal(props.src)
    }
    else if (isSvgBase64(props.src)) {
      loadSvgBase64(props.src)
    }
    else if (isBase64(props.src)) {
      isVisible.value = true
    }
    else {
      console.warn("Icon: Invalid src format. Expected remote src or local path starting with ~/ or @/", props.src)
    }
  }
  catch (error) {
    console.error("Failed to load SVG:", error)
  }
}

/** Handle image load */
function handleLoad() {
  isLoaded.value = true
}

/** Handle image error */
function handleError() {
  isError.value = true
}

onMounted(async () => {
  if (!props.src) {
    return console.warn("Icon: src prop is required")
  }

  if (!props.lazy || !iconRef.value) {
    return loadSvg()
  }

  observe(iconRef.value, () => {
    loadSvg()
  })
})

onUnmounted(() => {
  if (iconRef.value) {
    unobserve(iconRef.value)
  }
})
</script>

<template>
  <em
    v-if="!isVisible || isError"
    ref="iconRef"
    class="__icon"
  />
  <i
    v-else-if="imageType === IMAGE_TYPE.SVG"
    ref="iconRef"
    class="__icon"
    v-html="svgContent"
  />
  <img
    v-else
    ref="iconRef"
    class="__icon"
    :src="imageUrl"
    :class="{ loaded: isLoaded }"
    @load="handleLoad"
    @error="handleError"
  >
</template>

<style lang="less" scoped>
.__icon {
  display: inline-block;
  vertical-align: middle;
}

em.__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 50%;
    position: absolute;
    background-image: url("@/assets/icons/heart.png");
    background-size: 100% 100%;
  }
}

img.__icon {
  opacity: 0;

  &.loaded {
    opacity: 1;
  }
}

:global(.__icon svg) {
  width: 100%;
  height: 100%;
}
</style>
