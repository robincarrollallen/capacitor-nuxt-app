import type { ExtractPropTypes } from 'vue'

export const NavigationBarProps = {
	title: {
		type: String,
		required: true
	},
	leftText: {
		type: String,
		required: false
	},
	rightText: {
		type: String,
		required: false
	}
}

export type NavigationBarProps = ExtractPropTypes<typeof NavigationBarProps>
