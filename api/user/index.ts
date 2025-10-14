import { post } from "../request"

export async function loginApi(params: any) {
  const { getInfo } = useDevice()
  const deviceInfo = getInfo()
  params.loginDeviceModel = `${deviceInfo.platform} ${deviceInfo.model} ${deviceInfo.operatingSystem} ${deviceInfo.osVersion}`
  return post("/api/frontend/trpc/auth.login", params, { auth: false })
}
