export type ShareConfigType = "TikTok" | "WhatsApp" | "YouTube" | "Kwai" | "Twitter" | "Instagram" | "Facebook" | "Telegram" | "Email"

/** 浏览器类型 */
export enum BROWSER {
  MOBILE_SAFARI = "Mobile Safari",
  CHROME = "Chrome",
  EDGE = "Edge",
  FACEBOOK = "Facebook",
  CHROME_WEBVIEW = "Chrome WebView",
  WEBKIT = "WebKit",
  SAMSUNG_INTERNET = "Samsung Internet",
}

/** 社交类型 */
export enum SOCIAL {
  KWAI = "Kwai",
  OPEN_URL = "OPEN_URL",
}

export function shareAgentUrl(type: ShareConfigType, shareUrl: string, name: string, agentShare = true) {
  const { t } = useI18n()

  if (isProxyUrl(shareUrl)) {
    name = addZeroWidthSpace(name)
  }
  const shareTextIsCustom = useAgentStore().config?.shareTextType === "Custom" && agentShare
  const shareText = addZeroWidthSpace(useAgentStore().config?.shareText ?? "")
  const content = shareTextIsCustom ? shareText : `${t("viewsSpread.agentShareUrl", { name })}`
  const baseUrl = encodeURIComponent(`${content} ${shareUrl}`)
  const recipient = "" // 邮件指定收件人/电话号码
  const subject = encodeURIComponent("") // 邮件分享主题

  const url = shareConfig[type]?.({ baseUrl, content, shareUrl, recipient, subject })
  if (!url)
    return
  openUrl(url, type)
}

/**
 * @description 跳转到指定URL
 * @param url 跳转网址
 */
export function openUrl(url: string, type?: string) {
  const systemStore = useSystemStore()

  // 使用表驱动定义不同场景的处理方式
  const urlHandlerTable = [
    {
      condition: () => systemStore.isApk || systemStore.isIosShelfPackage || systemStore.browser === BROWSER.WEBKIT,
      handler: () => openWindow(url),
    },
    {
      condition: () => (systemStore.os === OS.ANDROID && type === SOCIAL.KWAI) || type === SOCIAL.OPEN_URL,
      handler: () => window.open(url, "_blank"),
    },
    {
      condition: () => true,
      handler: () => window.location.href = url,
    },
  ]

  // 查表获取对应的处理函数
  const handler = urlHandlerTable.find(item => item.condition())?.handler

  // 代理所有的外跳链接
  sendPwaPramsToParent(
    { url, type: type || "" },
    IframeTrameTypes.OPEN_URL,
    handler,
  )
}

/**
 * 判断URL是否为代理链接
 * @param url 要判断的URL
 */
export function isProxyUrl(url: string): boolean {
  try {
    return new URL(url).searchParams.has("pid")
  }
  catch (error) {
    console.error("Invalid URL:", error)
    return false
  }
}

/**
 * 在URL链接的点号后面增加一个零宽度的空格符号，防止被识别为链接
 * @param url URL链接
 */
export function addZeroWidthSpace(url: string): string {
  const dotIndices = [...url.matchAll(/\./g)].map(match => match.index)
  let modifiedUrl = url
  for (let i = dotIndices.length - 1; i >= 0; i--) {
    modifiedUrl = `${modifiedUrl.slice(0, dotIndices[i] + 1)}\u200B${modifiedUrl.slice(dotIndices[i] + 1)}`
  }
  return modifiedUrl
}

const shareConfig = {
  TikTok: ({ baseUrl }: { baseUrl: string }) =>
    getPlatformUrl({
      iosUrl: `https://www.tiktok.com/?text=${baseUrl}`,
      androidUrl: `intent://www.tiktok.com/?text=${baseUrl}#Intent;package=com.zhiliaoapp.musically;scheme=https;end;`,
      defaultUrl: `https://www.tiktok.com/?text=${baseUrl}`,
    }),
  WhatsApp: ({ baseUrl }: { baseUrl: string }) =>
    getJsBridgeUrl(
      `https://api.whatsapp.com/send?text=${baseUrl}`,
      `whatsapp://send?text=${baseUrl}`,
    ),
  YouTube: ({ baseUrl }: { baseUrl: string }) =>
    getPlatformUrl({
      iosUrl: `youtube:/?text=${baseUrl}`,
      androidUrl: `intent://www.youtube.com/?text=${baseUrl}#Intent;package=com.google.android.youtube;scheme=https;end;`,
      defaultUrl: `https://www.youtube.com/?text=${baseUrl}`,
    }),
  Kwai: ({ baseUrl }: { baseUrl: string }) =>
    getPlatformUrl({
      iosUrl: `ikwai://home?target_url=${baseUrl}`,
      androidUrl: `ikwai://home?target_url=${baseUrl}`,
      defaultUrl: `https://www.kwai.com/?content=${baseUrl}`,
    }),
  Twitter: ({ content, shareUrl }: { content: string, shareUrl: string }) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(shareUrl)}`,
  Instagram: ({ baseUrl }: { baseUrl: string }) =>
    getPlatformUrl({
      iosUrl: `instagram:/?quote=${baseUrl}`,
      androidUrl: `intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end`,
      defaultUrl: `https://www.instagram.com/?quote=${baseUrl}`,
    }),
  Facebook: ({ content, shareUrl }: { content: string, shareUrl: string }) =>
    getPlatformUrl({
      iosUrl: `fb://share/?link=${shareUrl}`,
      androidUrl: `https://m.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(content)}`,
      defaultUrl: `https://m.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(content)}`,
    }),
  Telegram: ({ baseUrl }: { baseUrl: string }) =>
    `https://t.me/share/url?url=${baseUrl}`,
  Email: ({ baseUrl, recipient, subject }: { baseUrl: string, recipient: string, subject: string }) =>
    `mailto:${recipient}?subject=${subject}&body=${baseUrl}`,
}

function getPlatformUrl({ iosUrl, androidUrl, defaultUrl }: { iosUrl: string, androidUrl: string, defaultUrl: string }) {
  // @ts-ignore
  const systemStore = useSystemStore()
  if (systemStore.isIOS) {
    return iosUrl
  }
  if (systemStore.os === "Android" && !["Chrome", "Chrome WebView"].includes(systemStore.browser)) {
    return androidUrl
  }
  return defaultUrl
}

function getJsBridgeUrl(jsBridgeUrl: string, defaultUrl: string) {
  // @ts-ignore
  return window.jsBridge ? jsBridgeUrl : defaultUrl
}

/**
 * 调用apk openWindow事件
 * @param url 跳转网址
 */
export function openWindow(url: string) {
  const systemStore = useSystemStore() // 引入 systemStore
  // @ts-ignore
  if (window.jsBridge) {
    const info = { url }
    if (systemStore.browser === BROWSER.WEBKIT) {
      window.open(url, "_blank")
    }
    const jsonStr = JSON.stringify(info)
    // @ts-ignore
    window.jsBridge.postMessage("openWindow", jsonStr)
  }
  else {
    openUrl(url, SOCIAL.OPEN_URL)
  }
}

/**
 * @description 向父窗口发送PWA参数
 * @param params 需要发送的参数对象
 * @param type 消息类型
 * @param cb 回调函数 触发在非iframe中
 */
export async function sendPwaPramsToParent(params: Record<string, string>, type?: string, cb?: () => void) {
  if (isInIframe()) {
    await window.parent.postMessage({ type: type || IframeTrameTypes.PWA_PARAMS, params }, "*")
  }
  else {
    cb && cb()
    console.warn("unSafetyParent or use top window ", params)
  }
}

export const isSafetyParent = (win: Window = window) => window.name.includes("inner-iframe-app")

/**
 * 添加检查是否在 iframe 中的函数
 */
export function isInIframe() {
  try {
    if (isSafetyParent()) {
      return true
    }
    return window.self !== window.top
  }
  catch (e) {
    return false
  }
}

export const IframeTrameTypes = {
  PWA_PARAMS: "PWA_PARAMS",
  OPEN_URL: "OPEN_URL",
  IN_SERVICE_WORKER: "IN_SERVICE_WORKER",
}
