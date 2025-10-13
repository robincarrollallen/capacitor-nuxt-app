/** Theme type */
export const THEME_TYPE = {
	STYLE_1: 'Layout2:DarkGreen',
	STYLE_2: 'Layout2:GoldenYellow',
	STYLE_3: 'Layout2:BluePurple',
	STYLE_4: 'Layout3:AmberPurple',
	STYLE_5: 'Layout1:Blue',
	STYLE_6: 'Layout1:Green',
	STYLE_7: 'Layout1:BlueV01',
	STYLE_8: 'Layout1:GreenV01',
	STYLE_9: 'Layout1:GreenV02',
	STYLE_10: 'Layout1:Blue_V01',
	STYLE_11: 'Layout1:AmberPurple',
	STYLE_12: 'Layout1:PineGreenV01',
	STYLE_13: 'Layout1:PineGreenV02',
	STYLE_14: 'Layout1:BlueV02',
	STYLE_15: 'Layout1:AmberPurpleV01',
	STYLE_16: 'Layout1:AuroraYellow',
	STYLE_17: 'Layout2:PhantomBlue',
	STYLE_18: 'Layout2:NeoBlue',
	STYLE_19: 'Layout2:MystLightBlue',
	STYLE_20: 'Layout2:MidnightPurple',
	STYLE_25: 'Layout2:SupremeGreen'
} as const

/** Theme type */
export type ThemeType = typeof THEME_TYPE[keyof typeof THEME_TYPE]

export type ThemeKEY = Lowercase<keyof typeof THEME_TYPE>;

/** Theme style map type */
export type ThemeStyleMapType = {
  readonly [K in ThemeType]: Lowercase<keyof typeof THEME_TYPE>
}

/** Theme key map type */
export type ThemeKeyMapType = {
  readonly [K in keyof typeof THEME_TYPE]: Lowercase<K & string>
}

/** Supported themes array */
export const ThemeSupport = Object.values(THEME_TYPE)

/** Theme Style */
export const THEME_STYLE = Object.fromEntries(
	Object.entries(THEME_TYPE).map(([key, value]) => [value, key.toLowerCase()])
) as ThemeStyleMapType

/** Theme key */
export const THEME_KEY = Object.fromEntries(
	Object.entries(THEME_TYPE).map(([key, _value]) => [key, key.toLowerCase()])
) as ThemeKeyMapType
