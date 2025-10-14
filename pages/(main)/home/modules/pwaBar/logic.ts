export function usePwaBarLogic() {
  const tenantStore = useTenantStore()
  const tenantInfo = computed(() => tenantStore.tenantInfo)

  /** Install PWA */
  const installPwa = () => {
    showTextPopup("Você tem bônus de depósito não resgatados. Por favor, resgate-os antes de fazer apostas. Não resgatados após apostar, considerados como")
  }

  return {
    tenantInfo,
    installPwa,
  }
}
