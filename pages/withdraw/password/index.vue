<script setup lang="ts">
defineOptions({
  name: "WithdrawPasswordPage",
  ssr: false,
})

const password = ref("") // 支付密码
const passwordConfirm = ref("") // 确认密码
</script>

<template>
  <div class="withdraw-password-page page-safe-area">
    <NavigateBar :title="$t('label.asset')" left-arrow />
    <main>
      <h1>
        {{ `${$t('main.set')}${$t('label.asset')}` }}
      </h1>
      <h2>
        {{ `${$t('main.new')}${$t('label.asset')}` }}
      </h2>
      <PasswordInput v-model="password" autofocus />
      <h2>
        {{ `${$t('main.confirm')}${$t('label.asset')}` }}
      </h2>
      <PasswordInput v-model="passwordConfirm" />
      <h3>
        {{ $t('tip.firstWithdrawal') }}
      </h3>
      <Button>{{ $t('label.withdrawNow') }}</Button>
    </main>
  </div>
</template>

<style lang="less" scoped>
.withdraw-password-page {
    height: 100%;
    display: flex;
    flex-direction: column;

    main {
        flex: 1;
        padding: 1rem;

        h1 {
            font-size: .875rem;
            font-weight: var(--ep-font-weight-medium, 600);
        }

        h2 {
            font-size: .75rem;
            padding: 1rem 0 .625rem;
            color: var(--ep-color-text-weaker);
        }

        h3 {
            font-size: .625rem;
            padding: 1rem 0 1.75rem;
            color: var(--ep-color-text-warning);
        }

        button {
            --padding-top: 1rem;
            --padding-bottom: 1rem;
            font-size: var(--ep-font-size-m, .875rem);
            font-weight: var(--ep-font-weight-bold, 700);
        }
    }
}
</style>
