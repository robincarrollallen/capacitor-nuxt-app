export function useInputErrorMessage() {
  const { $i18n } = useNuxtApp()

  return {
    account: $i18n.t("hint.invalidUsername"),
    password: $i18n.t("hint.invalidPassword"),
  }
}
