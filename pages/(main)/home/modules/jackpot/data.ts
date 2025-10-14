let interval: NodeJS.Timeout | null = null

export function setAmountInterval(amountInterval: NodeJS.Timeout) {
  interval = amountInterval
}

export function getInterval() {
  return interval
}
