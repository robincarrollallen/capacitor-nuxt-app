export function useNavBarMenuLogic() {
  const statusStore = useStatusStore()

  const showMainLeftDrawer = () => {
    statusStore.showMainLeftDrawer()
  }

  return {
    showMainLeftDrawer,
  }
}
