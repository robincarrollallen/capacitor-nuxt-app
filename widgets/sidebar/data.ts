export let interval: NodeJS.Timeout | null = null

export const setAmountInterval = (amountInterval: NodeJS.Timeout) => {
	interval = amountInterval
}

export const sortIconPosition = {
	POPULAR: 'background-position: 0px 0px',
	ACTION: 'background-position: 17% 0px',
	JUMPING: 'background-position: 84% 0px',
	SHOOTING: 'background-position: 67% 0px',
	STRATEGY: 'background-position: 34% 0px',
	ADVENTURE: 'background-position: 50% 0px',
	THREE_D: 'background-position: 100% 0px',
}
