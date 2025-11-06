import { REGULAR, type RegularSupport } from "@/enums/regular"

/** Check if a value is empty */
export function isEmpty(value: any) {
  // null or undefined
  if (value == null)
    return true

  // string
  if (typeof value === "string")
    return value.trim().length === 0

  // array
  if (Array.isArray(value))
    return value.length === 0

  // object
  if (typeof value === "object") {
    // Map or Set
    if (value instanceof Map || value instanceof Set)
      return value.size === 0
    // plain object
    return Object.keys(value).length === 0
  }

  // number (0 is not considered empty, but NaN is)
  if (typeof value === "number")
    return Number.isNaN(value)

  return false
}

/** 验证输入是否合法 */
export function validateInput(value: string, type: RegularSupport) {
  const ERROR_MESSAGE = useInputErrorMessage()

  const regex = REGULAR[type]

  return regex?.test(value) || ERROR_MESSAGE[type]
}
