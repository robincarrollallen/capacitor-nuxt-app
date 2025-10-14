export let interval: NodeJS.Timeout | null = null

export const setAmountInterval = (amountInterval: NodeJS.Timeout) => {
	interval = amountInterval
}

export const sortIconPosition = {
	POPULAR: 'background-position: 0px 0px',
	SPORTS: 'background-position: 84% 0px',
	CHESS: 'background-position: 34% 0px',
	VIDEO: 'background-position: 67% 0px',
	ELECTRONIC: 'background-position: 17% 0px',
	FISHING: 'background-position: 50% 0px',
	LOTTERY: 'background-position: 100% 0px',
}
