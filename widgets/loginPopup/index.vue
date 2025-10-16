<script setup lang="ts">
import { useLoginPopupLogic } from "./logic"
import { INPUT_TYPE } from "@/enums"
import { Components } from "@/theme/components"

const statusStore = useStatusStore()
const NavBarLogo = defineAsyncComponent(Components.navBarLogo)

const { tabs, accountType, username, password, isLogin, isAccount, isPhone, isRegister, confirmPassword, loginHandler, registerHandler, handleClose } = useLoginPopupLogic()
</script>

<template>
  <van-popup
    v-model:show="statusStore.loginPopupVisible"
    round
    position="bottom"
    teleport="#__main"
    overlay-class="login-popup-overlay"
    @closed="handleClose"
  >
    <div class="login-popup-wrap">
      <!-- 头部/logo/关闭按钮 -->
      <nav>
        <NavBarLogo />
        <van-icon class="close-icon" name="cross" @click="statusStore.hideLoginPopup" />
      </nav>

      <div class="login-popup-content">
        <header v-if="isLogin">
          <h1>{{ $t('main.loginTips') }}</h1>
          <h2>
            <label>{{ $t('label.noAccount') }}</label>
            <span @click="statusStore.showRegisterPopup()">{{ $t('main.register') }}</span>
            <p />
          </h2>
        </header>
        <header v-else>
          <h1>{{ $t('main.registerTips') }}</h1>
          <h2>
            <label>{{ $t('label.haveAccount') }}</label>
            <span @click="statusStore.resetLoginPopupType()">{{ $t('main.login') }}</span>
          </h2>
        </header>

        <b><SliderTabs v-model:model-value="accountType" :tabs="tabs" /></b>

        <form class="login-popup-content-body">
          <Input v-if="isAccount" v-model="username" error clearable :type="INPUT_TYPE.ACCOUNT" required :placeholder="$t('label.username')">
            <template #prefix>
              <van-icon name="user-o" />
            </template>
          </Input>
          <Input v-if="isPhone" v-model="username" error clearable :type="INPUT_TYPE.PHONE" required :placeholder="$t('label.phone')">
            <template #prefix>
              <van-icon name="phone-o" />
            </template>
          </Input>
          <Input v-model="password" error clearable :type="INPUT_TYPE.PASSWORD" required :placeholder="$t('label.password')">
            <template #prefix>
              <van-icon name="lock" />
            </template>
          </Input>
          <Input v-if="isRegister" v-model="confirmPassword" error clearable :type="INPUT_TYPE.PASSWORD" required :placeholder="$t('label.confirmPassword')">
            <template #prefix>
              <van-icon name="lock" />
            </template>
          </Input>
        </form>

        <div class="submit-btn">
          <Button v-if="isLogin" @click="loginHandler">
            {{ $t('main.login') }}
          </Button>
          <Button v-else @click="registerHandler">
            {{ $t('main.register') }}
          </Button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="less">
@import './index.less';
</style>
