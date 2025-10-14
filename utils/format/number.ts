const formatterCache = new Map() // Cache formatter

/**
 * Get cached formatter
 * @param locale - The locale to use
 * @param decimals - The number of decimal places
 */
function getCachedFormatter(locale: string, decimals: number) {
  const key = `${locale}-${decimals}`
  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.NumberFormat(locale, {
      useGrouping: true,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }))
  }
  return formatterCache.get(key)
}

/**
 * Format number to thousands and truncate decimals
 * @param {number|string} value The number to be formatted
 * @param {number} decimals The number of decimal places, default 2
 */
export function formatMoney(value: number | string, decimals: number = 2) {
  const language = useAppStore().locale
  let num = safeNumber(value)

  // Handle negative number symbol
  const sign = num < 0 ? "-" : ""
  num = Math.abs(num)

  // Truncate decimals, not rounding
  const factor = 10 ** decimals
  num = Math.trunc(num * factor) / factor

  // Pad decimal places
  const numStr = num.toFixed(decimals)

  // Format integer part with Intl.NumberFormat
  const numberFormatter = getCachedFormatter(language, decimals)
  const formatted = numberFormatter.format(safeNumber(numStr))

  return `${sign}${formatted}`
}

/**
 * Format server amount to local
 * @param {number|string} value The number to be formatted
 * @param {number} multiple Multiple, default 100
 */
export function formatMoneyToLocal(value: number | string, multiple: number = 100) {
  return formatMoney(safeNumber(value) / multiple)
}

/**
 * Safely convert to number
 * @param value - The value to convert
 * @param defaultValue - Default value, defaults to 0
 */
export function safeNumber(value?: number | string, defaultValue = 0) {
  const num = Number(value)
  return Number.isNaN(num) || num === 0 ? defaultValue : num
}

/**
 * Safely convert to positive number
 * @param value - The value to convert
 * @param isPositive - Whether to convert to positive number, defaults to false (negative numbers become 0)
 */
export function safePositiveNumber(value: number | string, isPositive = false) {
  const num = safeNumber(value)

  if (num < 0) {
    return isPositive ? Math.abs(num) : 0
  }

  return num
}

/**
 * Truncate number to specified decimal places (no rounding)
 * @param value - The value to process
 * @param digits - Number of decimal places
 * @param padZero - Whether to pad with zeros, defaults to false
 */
export function truncateDecimal(value: string | number, digits = 2, padZero = false) {
  const str = String(safeNumber(value)) // Convert to string

  const dotIndex = str.indexOf(".") // Find decimal point position

  // If there's no decimal point
  if (dotIndex === -1) {
    // If padding with zeros is needed, add decimal point and zeros
    if (padZero) {
      return `${str}.${"0".repeat(digits)}`
    }
    return str
  }

  const truncated = str.substring(0, dotIndex + digits + 1) // Truncate to specified decimal places

  // If padding with zeros is needed
  if (padZero) {
    const currentDecimalDigits = truncated.length - dotIndex - 1 // Calculate current decimal places

    // If decimal places are insufficient, pad with zeros
    if (currentDecimalDigits < digits) {
      return `${truncated}${"0".repeat(digits - currentDecimalDigits)}`
    }
  }

  return truncated
}

/**
 * Fixed number to specified decimal places (no rounding)
 * @param value - The value to process
 * @param digits - Number of decimal places
 */
export function fixedNumber(value?: string | number, digits = 2) {
  const num = safeNumber(value)

  const str = num.toFixed(digits + 1)

  const [intPart, decimalPart] = str.split(".")

  return `${intPart}.${decimalPart.slice(0, digits)}`
}
