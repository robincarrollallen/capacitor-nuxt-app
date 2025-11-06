export function useInputErrorMessage() {
  const { t } = useI18n()

  return {
    account: t("hint.invalidUsername"),
    password: t("hint.invalidPassword"),
  }
}
