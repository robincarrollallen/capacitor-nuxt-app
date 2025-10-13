import mainMediaListData from 'public/data/mainMediaList.json'
import tenantInfoData from 'public/data/tenantInfo.json'
import bannerListData from 'public/data/bannerList.json'
import { getCurrency } from '@/enums/currency'
import type { ThemeType } from '@/theme/type'

export const useTenantStore = defineStore('tenant', () => {
	const tenantInfo = ref(tenantInfoData)
	const mainMediaList = ref(mainMediaListData)
	const bannerList = ref(bannerListData)

	const merchantCy = computed(() => getCurrency(tenantInfo.value.region?.currency)) // Merchant currency
	const theme = computed(() => tenantInfo.value.skinTwoType as ThemeType)

	return { tenantInfo, mainMediaList, bannerList, merchantCy, theme }
})
