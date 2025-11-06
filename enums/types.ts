/** Input type */
export const INPUT_TYPE = {
  TEXT: "text",
  ACCOUNT: "account",
  PHONE: "phone",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  REMEMBER_ACCOUNT: "rememberAccount",
  LOGIN_PASSWORD: "loginPassword",
  ASSETS_PASSWORD: "assetsPassword",
} as const

/** Account type */
export const ACCOUNT_TYPE = {
  ACCOUNT: "account",
  PHONE: "phone",
} as const

/** Image type */
export const IMAGE_TYPE = {
  SVG: "svg",
  WEBP: "webp",
} as const

export type ImageType = typeof IMAGE_TYPE[keyof typeof IMAGE_TYPE]
export const IMAGE_TYPE_VALUES = Object.values(IMAGE_TYPE)
