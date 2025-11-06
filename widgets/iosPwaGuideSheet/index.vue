<script setup lang="ts">
const statusStore = useStatusStore()
const tenantStore = useTenantStore()

const icon = computed(() => tenantStore.tenantInfo?.appIcon)
const name = computed(() => tenantStore.tenantInfo?.name)
const url = computed(() => location.host)
</script>

<template>
  <van-action-sheet v-model:show="statusStore.iosPwaGuideSheetVisible" class="ios-pwa-guide-sheet">
    <template #description>
      <!-- 标题 -->
      <nav>
        <label>{{ $t('guide.installTheApp') }}</label>
        <van-icon class="close-icon" name="cross" @click="statusStore.hideIosPwaGuideSheet" />
      </nav>
    </template>
    <article>
      <!-- 应用信息 -->
      <div class="app-info">
        <van-image :src="icon" />
        <div>
          <strong class="font-bold text-sm mb-1.5">
            {{ name }}
          </strong>
          <span class="text-xs">
            {{ url }}
          </span>
        </div>
      </div>
      <div class="step-item">
        <b>
          1.
        </b>
        <div class="step-content">
          <p>{{ $t('guide.tapOn') }}</p>
          <Icon src="@/assets/svg/ios_share.svg" />
          <p>{{ $t('guide.inTheBrowserMenu') }}</p>
        </div>
      </div>
      <div class="step-item">
        <b>
          2.
        </b>
        <div class="step-content">
          <p>{{ $t('guide.scrollDownAndAelect') }}</p>
          <label class="border">
            {{ $t('guide.addToHomeScreen') }}
          </label>
        </div>
      </div>
      <div class="step-item">
        <b>
          3.
        </b>
        <div class="step-content">
          <p>{{ $t('guide.scrollDownAndAelect') }}</p>
          <van-image :src="icon" />
          <p>{{ $t('guide.iconOnYourHomeScreen') }}</p>
        </div>
      </div>
    </article>
  </van-action-sheet>
</template>

<style scoped lang="less">
:global(.ios-pwa-guide-sheet ) {
  --van-border-color: transparent;
}

nav {
  display: flex;
  justify-content: space-between;
  font-size: var(--ep-font-size-l, 1rem);
  font-weight: var(--ep-font-weight-medium, 600);
  color: #000;

  i {
    font-weight: bold;
  }
}

article {
  padding: 1.25rem;
  font-size: var(--ep-font-size-m, .875rem);
  gap: 1.5rem;
  display: flex;
  flex-direction: column;

  .app-info {
    gap: 1rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: .5rem;
    border: 1px solid rgb(229 231 235);

    .van-image {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: .625rem;
      overflow: hidden;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      strong {
        font-size: var(--ep-font-size-m, .875rem);
        color: #000;
      }

      span {
        font-size: var(--ep-font-size-s, 0.75rem);
      }
    }
  }

  .step-item {
    gap: .5rem;
    display: flex;

    .step-content {
      display: flex;
      align-items: center;
      gap: .25rem;
      flex-wrap: wrap;

      i {
        color: #007aff;
        width: 1.25rem;
      }

      .van-image {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: .375rem;
        overflow: hidden;
      }

      label {
        padding: 0 .25rem;
        border-radius: .25rem;
        border: 1px solid rgb(229 231 235);
      }
    }
  }
}
</style>
