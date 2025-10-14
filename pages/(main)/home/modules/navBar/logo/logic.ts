export const useNavBarLogoLogic = () => {
	const tenantStore = useTenantStore()

	return {
		tenantInfo: tenantStore.tenantInfo
	}
}
