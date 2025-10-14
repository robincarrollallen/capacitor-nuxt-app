import type { ExtractPropTypes } from 'vue'

export const NavigationProps = {
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: false
	},
	link: {
		type: String,
		required: false
	},
	arrow: {
		type: Boolean,
		required: false
	}
}

export type NavigationProps = ExtractPropTypes<typeof NavigationProps>
