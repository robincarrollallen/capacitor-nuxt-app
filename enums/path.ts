export const MAIN_PATH = {
  HOME: "/home",
  ACTIVITY: "/activity",
  DEPOSIT: "/deposit",
  PROFILE: "/profile",
} as const

export const MAIN_PATHS = Object.values(MAIN_PATH)

export type MainPathType = typeof MAIN_PATH[keyof typeof MAIN_PATH]
