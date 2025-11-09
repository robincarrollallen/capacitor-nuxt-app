<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  shiny?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  loading: false,
  shiny: false,
})

const buttonRef = ref(null)
const rippleRef = ref(null)

let isPressed = false

function startRipple(event: Recordable) {
  const ripple = rippleRef.value
  if (!ripple)
    return

  isPressed = true

  // Calculate ripple position
  const rect = buttonRef.value.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  // Get touch/click position
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY

  const x = clientX - rect.left - size / 2
  const y = clientY - rect.top - size / 2

  // Set ripple style
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.style.width = `${size}px`
  ripple.style.height = `${size}px`

  // Start animation
  ripple.style.transform = "scale(0)"
  ripple.style.opacity = "1"

  // Force redraw and start diffusion animation
  ripple.style.transition = "transform 0.3s ease-out"
  ripple.style.transform = "scale(2)"
}

function endRipple() {
  if (!isPressed)
    return

  isPressed = false
  const ripple = rippleRef.value
  if (!ripple)
    return

  // Cancel ripple animation
  ripple.style.transition = "opacity 0.2s ease-out"
  ripple.style.opacity = "0"

  // After animation, reset
  setTimeout(() => {
    ripple.style.transform = "scale(0)"
    ripple.style.transition = "none"
  }, 200)
}
</script>

<template>
  <button
    ref="buttonRef"
    :disabled="props.disabled || props.loading"
    :class="{ shiny: !props.disabled && props.shiny }"
    @mousedown="startRipple"
    @mouseup="endRipple"
    @mouseleave="endRipple"
    @touchstart.passive="startRipple"
    @touchend="endRipple"
    @touchcancel="endRipple"
  >
    <span
      ref="rippleRef"
    />
    <van-loading v-if="props.loading" type="spinner">
      <slot />
    </van-loading>
    <slot v-else />
  </button>
</template>

<style lang="less" scoped>
button {
	width: 100%;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius, 0.5rem);
  background: var(--ep-dynamic-primary);
	padding: var(--padding-top, 0.5rem) var(--padding-start, 1rem) var(--padding-bottom, 0.5rem) var(--padding-end, 1rem);

	&.shiny {
		overflow: hidden;
	}

	&.shiny::before {
		content: '';
		background: #FFFFFF;
		display: inline-block;
		height: 100%;
		left: 0;
		position: absolute;
		top: -180px;
		width: 30px;
		z-index: 1;
		animation: shiny 4s ease-in-out infinite;
	}

  &:disabled {
    cursor: not-allowed;
    color: var(--ep-color-text-inverse-disabled);
    background: var(--ep-color-background-fill-active-disabled);
  }

	:deep(div) {
		span:nth-child(1) {
			width: var(--loading-size, .75rem);
			height: var(--loading-size, .75rem);
		}
	}
}

span {
  z-index: 1;
  opacity: 0;
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  pointer-events: none;
  background: var(--ripple-color, rgba(255, 255, 255, 0.3));
}

@keyframes shiny {
  0% {
    opacity: 0;
    transform: scale(0) rotate(45deg);
  }

  80% {
    opacity: 0.5;
    transform: scale(0) rotate(45deg);
  }

  81% {
    opacity: 1;
    transform: scale(4) rotate(45deg);
  }

  100% {
    opacity: 0;
    transform: scale(50) rotate(45deg);
  }
}
</style>
