export function usePwaBarLogic() {
  const statusStore = useStatusStore()
  const tenantStore = useTenantStore()
  const tenantInfo = computed(() => tenantStore.tenantInfo)

  /** Install PWA */
  const installPwa = () => {
    statusStore.showIosPwaGuideSheet()
  }

  return {
    tenantInfo,
    installPwa,
  }
}
