import type { ExtractPropTypes } from 'vue'

export const flagProps = {
	iso: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: false
	}
}

export type MyButtonProps = ExtractPropTypes<typeof flagProps>
