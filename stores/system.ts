import { defineStore } from "pinia"
import { BASE_FONT_SIZE, MOBILE_DESIGN_WIDTH, MOBILE_MAX_WIDTH } from "@/constant"

export const useSystemStore = defineStore("system", () => {
  const fontSize = ref(16) // Font size
  const screenWidth = ref(window.innerWidth) // Screen width
  const screenHeight = ref(window.innerHeight) // Screen height

  /**
   * Update screen information
   */
  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
    setRemBase()
  }

  /**
   * Set rem base
   */
  function setRemBase() {
    const html = document.documentElement
    let width = html.clientWidth
    if (MOBILE_MAX_WIDTH < width && width < 769) {
      width = width - MOBILE_MAX_WIDTH + MOBILE_DESIGN_WIDTH
    }
    if (width > MOBILE_MAX_WIDTH) {
      width = MOBILE_MAX_WIDTH
    }
    fontSize.value = (width / MOBILE_DESIGN_WIDTH) * BASE_FONT_SIZE
    html.style.fontSize = `${fontSize.value}px`
  }

  return { screenWidth, screenHeight, fontSize, updateScreenSize }
})
