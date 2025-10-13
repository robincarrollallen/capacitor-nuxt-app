import software from "public/data/software.json"
import inviteInfoData from "public/data/inviteInfo.json"
import myAgentInfoData from "public/data/myAgentInfo.json"
import agencyConfigData from "public/data/agencyConfig.json"

export const useAgentStore = defineStore("agent", () => {
  const shareConfig = ref({
    software,
  })

  const inviteInfo = ref(inviteInfoData)
  const agencyConfig = ref(agencyConfigData)
  const myAgentInfo = ref(myAgentInfoData.info)

  return { shareConfig, inviteInfo, agencyConfig, myAgentInfo }
})
export type SoftwareType = typeof software
export type InviteInfoType = typeof inviteInfoData
export type AgencyConfigType = typeof agencyConfigData
export type MyAgentInfoType = typeof myAgentInfoData.info
