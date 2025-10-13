export const COUNTRY = {
	CN: 'CN',
	US: 'US',
	JP: 'JP',
	KR: 'KR',
	TW: 'TW',
	HK: 'HK',
	MO: 'MO',
} as const

export type COUNTRY_TYPE = typeof COUNTRY[keyof typeof COUNTRY]
