export function showPopup(message: string | (() => VNode), callback?: () => void) {
  showDialog({
    title: " ",
    message,
    className: "common-dialog",
    showCancelButton: true,
  }).then(() => {
    // 用户点击确认
    if (callback)
      callback()
  })
    .catch(() => {
      // 用户点击取消或关闭
      console.log("Cancel")
    })
}

/** Show text popup */
export function showTextPopup(message: string, callback?: () => void) {
  showPopup(message, callback)
}

export function showLoading() {
  showLoadingToast({
    duration: 0,
    overlay: true,
    forbidClick: true,
    loadingType: "spinner",
    overlayStyle: { "--van-overlay-background": "rgba(0, 0, 0, .5)" },
  })
}
