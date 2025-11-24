export function usePwaBarLogic() {
  const statusStore = useStatusStore()
  const tenantStore = useTenantStore()
  const deviceStore = useDeviceStore()

  const tenantInfo = computed(() => tenantStore.tenantInfo)
  const isNative = computed(() => deviceStore.isNative)

  /** Install PWA */
  const installPwa = () => {
    statusStore.showIosPwaGuideSheet()
  }

  return {
    isNative,
    tenantInfo,
    installPwa,
  }
}
