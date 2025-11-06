/** Regular expressions */
export const REGULAR = {
  account: /^(?=.*[a-z])(?=.*\d)[a-z][a-z0-9]{7,15}$/i,
  password: /^(?!.*\s).{6,16}$/,
}

export type RegularSupport = keyof typeof REGULAR
