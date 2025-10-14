<script setup lang="ts">
import { getOrSetSvgCacheAsync } from "./data"

interface Props {
  url?: string
  src?: string
}

const componentProps = withDefaults(defineProps<Props>(), {
  url: "",
  src: "",
})

const svgContent = ref("")

const props = reactive({
  url: componentProps.url || componentProps.src,
})

watch([() => componentProps.url, () => componentProps.src], () => {
  props.url = componentProps.url || componentProps.src
})

// Simplified path processing
function processPath(url: string) {
  const cleanPath = url.replace(/^[~@]\/+/, "")
  const parts = cleanPath.split("/")
  const fileName = parts.pop()?.replace(/\.svg$/i, "") || ""
  return [...parts, fileName]
}

// Simplified dynamic import
async function importSvg(pathParts: string[]) {
  // Use different import methods based on path length
  const importMap = {
    2: () => import(`@/${pathParts[0]}/${pathParts[1]}.svg?raw`),
    3: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}.svg?raw`),
    4: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}.svg?raw`),
    5: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}.svg?raw`),
    6: () => import(`@/${pathParts[0]}/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}/${pathParts[4]}/${pathParts[5]}.svg?raw`),
  }

  const importFn = importMap[pathParts.length as keyof typeof importMap]
  if (!importFn) {
    throw new Error(`Unsupported path depth: ${pathParts.length}`)
  }

  const iconModule = await importFn()
  return iconModule.default
}

/**
 * Load remote SVG file
 * @param url - The URL of the SVG file
 */
async function loadRemoteSvg(url: string) {
  try {
    const response = await fetch(url)
    const contentType = response.headers.get("content-type")

    if (contentType?.includes("image/svg+xml")) {
      return await response.text()
    }
    else {
      return `<img src="${url}" />`
    }
  }
  catch (error) {
    console.error(`Failed to load remote SVG: ${url}`, error)
    return `<img src="${url}" />`
  }
}

/**
 * Load local SVG file
 * @param url - The URL of the SVG file
 */
async function loadLocalSvg(url: string) {
  return getOrSetSvgCacheAsync(url, async () => {
    // Check if the URL ends with .svg
    if (!url.toLowerCase().endsWith(".svg")) {
      return `<img src="${url}" />`
    }

    try {
      const pathParts = processPath(url)
      return await importSvg(pathParts)
    }
    catch (error) {
      console.error(`Failed to load SVG from path: ${url}`, error)
      throw error
    }
  })
}

onMounted(async () => {
  if (!props.url) {
    return console.warn("SvgIcon: url prop is required")
  }

  try {
    const isRemote = props.url.startsWith("/") || props.url.startsWith("http")
    const isLocal = props.url.startsWith("~/") || props.url.startsWith("@/")

    if (isRemote) {
      svgContent.value = await loadRemoteSvg(props.url)
    }
    else if (isLocal) {
      svgContent.value = await loadLocalSvg(props.url)
    }
    else {
      console.warn("SvgIcon: Invalid url format. Expected remote URL or local path starting with ~/ or @/")
    }
  }
  catch (error) {
    console.error("Failed to load SVG:", error)
  }
})
</script>

<template>
  <i
    v-if="svgContent"
    class="svg__icon"
    v-html="svgContent"
  />
</template>

<style scoped>
.svg__icon {
  display: inline-block;
  vertical-align: middle;
}

:global(.svg__icon svg) {
  width: 100%;
  height: 100%;
}
</style>
