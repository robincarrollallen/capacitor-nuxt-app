import { showDialog } from "vant"

export function showPopup(message: string | (() => VNode)) {
  showDialog({
    title: " ",
    message,
    className: "common-dialog",
    showCancelButton: true,
  }).then(() => {
    // 用户点击确认
  })
    .catch(() => {
      // 用户点击取消或关闭
      console.log("Cancel")
    })
}

/** Show text popup */
export function showTextPopup(message: string) {
  showPopup(message)
}
