<script setup>
import { ref, watch, onMounted } from 'vue'
import { formatMoney } from '~/utils/format/number'

const props = defineProps({
	value: {
		type: Number, // Pass in the display value
		required: true
	},
	duration: {
		type: Number,
		default: 1000 // Animation duration, milliseconds
	},
	decimals: {
		type: Number,
		default: 0 // Decimal places
	}
})

let animationFrameId = null // Used to store the ID of requestAnimationFrame, for easy cancellation

const displayValue = ref(props.value) // The responsive value used to display the component internally

const formattedDisplayValue = computed(() => formatMoney(displayValue.value, props.decimals))

/**
 * Start number animation
 * @param {number} startVal - Animation start value
 * @param {number} endVal - Animation target value
 * @param {number} duration - Animation duration (milliseconds)
 */
const animateValue = (startVal, endVal, duration) => {
	const startTime = performance.now() // Animation start time

	const step = (currentTime) => {
		const elapsedTime = currentTime - startTime // Time elapsed
		const progress = Math.min(elapsedTime / duration, 1) // Animation progress (0 to 1, ensure not exceeded)

		// Calculate the current value to be displayed based on the progress
		const currentValue = startVal + (endVal - startVal) * progress
		displayValue.value = currentValue

		// If the animation is not over, continue to the next frame
		if (progress < 1) {
			animationFrameId = requestAnimationFrame(step)
		} else {
			// Ensure the final value is displayed when the animation ends
			displayValue.value = endVal
		}
	}

	// If there is an animation in progress, cancel it first
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId)
	}
	// Start animation
	animationFrameId = requestAnimationFrame(step)
}

// Listen for changes in the value prop, trigger animation
watch(() => props.value, (newValue, oldValue) => {
	animateValue(oldValue === undefined ? props.value : oldValue, newValue, props.duration)
}, { immediate: true })

// When the component is mounted, if the animation needs to start from 0 to the initial value, it can be handled here
onMounted(() => {
	if (props.value !== 0) { // When the component is first rendered, if the value is not the initial value (e.g. 0), the animation starts from 0, otherwise, the value is displayed directly
		animateValue(0, props.value, props.duration)
	}
})

// When the component is unmounted, clean up the animation frame to avoid memory leaks
onUnmounted(() => {
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId)
	}
})
</script>

<template>
  <span>{{ formattedDisplayValue }}</span>
</template>

<style lang="less" scoped>
span {
	white-space: nowrap;
}
</style>
