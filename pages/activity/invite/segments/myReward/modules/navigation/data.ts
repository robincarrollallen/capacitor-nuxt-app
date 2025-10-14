const router = useRouter()

export const useNavigationData = () => {
	const { $i18n } = useNuxtApp()

	const agentNavigationList = [
		{ name: $i18n.t('mlmAgent.nextLevelData'), bgIcon: 'jump-bg1', fun: () => { router.push({ path: '/mlmAgent/subordinate' }) } },
		{ name: $i18n.t('main.commissionDetails'), bgIcon: 'jump-bg2', fun: () => { router.push({ path: '/mlmAgent/commissionDetail' }) } },
		{ name: $i18n.t('agent.firstDepositComm'), bgIcon: 'jump-bg6', fun: () => { router.push({ path: '/mlmAgent/firstDepositCommission' }) } },
		{ name: $i18n.t('label.invite') + $i18n.t('main.rules'), bgIcon: 'jump-bg3', fun: () => { router.push({ path: '/mlmAgent/invitationRules' }) } },
		{ name: $i18n.t('mlmAgent.agentLevel'), bgIcon: 'jump-bg4', fun: () => { router.push({ path: '/mlmAgent/agentLevel' }) } },
		{ name: $i18n.t('mlmAgent.commissionRate'), bgIcon: 'jump-bg5', fun: () => { router.push({ path: '/mlmAgent/commissionRate' }) } },
	]

	return {
		agentNavigationList
	}
}
