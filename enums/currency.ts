export const CURRENCY = {
	/** Chinese Yuan */
	CNY: '¥',
	/** US Dollar */
	USD: '$',
	/** Euro */
	EUR: '€',
	/** British Pound */
	GBP: '£',
	/** Japanese Yen */
	JPY: '¥',
	/** South Korean Won */
	KRW: '₩',
	/** Australian Dollar */
	AUD: '$',
	/** Canadian Dollar */
	CAD: '$',
	/** Hong Kong Dollar */
	HKD: '$',
	/** Indian Rupee */
	INR: '₹',
	/** Russian Ruble */
	RUB: '₽',
	/** South African Rand */
	ZAR: 'R',
	/** Singapore Dollar */
	SGD: '$',
	/** Mexican Peso */
	MXN: '$',
	/** New Zealand Dollar */
	NZD: '$',
	/** Turkish Lira */
	TRY: '₺',
	/** Swedish Krona */
	SEK: 'kr',
	/** Norwegian Krone */
	NOK: 'kr',
	/** Danish Krone */
	DKK: 'kr',
	/** Brazilian Real */
	BRL: 'R$',
	/** Swiss Franc */
	CHF: 'CHF',
	/** Philippine Peso */
	PHP: '₱',
	/** Vietnamese Dong */
	VND: '₫',
} as const

export type CURRENCY_CODE = keyof typeof CURRENCY;
export type CURRENCY_TYPE = typeof CURRENCY[keyof typeof CURRENCY]

export const CurrencySupport = Object.values(CURRENCY)
export const CurrencyCodes = Object.keys(CURRENCY) as CURRENCY_CODE[]

/** get currency */
export const getCurrency = (currencyCode?: string): string => {
	return (currencyCode && currencyCode in CURRENCY) ? CURRENCY[currencyCode] : CURRENCY.USD
}
