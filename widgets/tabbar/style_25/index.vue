<script setup lang="ts">
import { tabbarList } from "../data"

const route = useRoute()

const icons = {
  inicio: new URL(`@/assets/svg/tabbar/tab/inicio-25.svg`, import.meta.url).href,
  inicio_active: new URL(`@/assets/svg/tabbar/tab/inicio-active-25.svg`, import.meta.url).href,
  promo: new URL(`@/assets/svg/tabbar/tab/promo-25.svg`, import.meta.url).href,
  promo_active: new URL(`@/assets/svg/tabbar/tab/promo-active-25.svg`, import.meta.url).href,
  entrar: new URL(`@/assets/svg/tabbar/tab/entrar-25.svg`, import.meta.url).href,
  entrar_active: new URL(`@/assets/svg/tabbar/tab/entrar-active-25.svg`, import.meta.url).href,
  perfil: new URL(`@/assets/svg/tabbar/tab/perfil-25.svg`, import.meta.url).href,
  perfil_active: new URL(`@/assets/svg/tabbar/tab/perfil-active-25.svg`, import.meta.url).href,
}
</script>

<template>
  <nav>
    <NuxtLink v-for="item in tabbarList" :key="item.path" active-class="active" replace :to="item.path">
      <div class="tab-icon-warp" :class="{ invite: !item.path }">
        <u v-if="!item.path" :class="{ active: !item.path }" @click="navigateTo('/activity/invite')">
          <b>
            <img class="tab-icon" src="@/assets/images/tabbar/flexible-25.png">
          </b>
        </u>
        <van-image v-else class="tab-icon" :src="icons[`${item.label}${route.path === item.path ? '_active' : ''}`]" :show-loading="false" />
      </div>

      <span v-if="item.path">{{ $t(`main.${item.label}`) }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="less">
@media (max-width: 539px) {
	nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: grid;
		z-index: 9;
		padding-bottom: .5rem;
		grid-template-columns: repeat(5, 1fr);
		height: calc(var(--sab) + 5.625rem);
		background: linear-gradient(to bottom, transparent 5.125rem, var(--ep-color-background-fill-foot-bar) 5.125rem);
		padding-bottom: calc(var(--sab) + .5rem);

		&::before {
			content: '';
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100%;
			aspect-ratio: 13/3;
			background: url('@/assets/svg/tabbar/bg-25.svg') no-repeat;
			background-size: 100% auto;
			background-position: bottom;
		}

		a {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-end;
			color: var(--ep-color-text-navigation-default);
			transition: all 0.3s ease;

			&:hover {
				transform: translateY(-2px);
			}

			.tab-icon-warp {
				position: relative;
				width: 2rem;
				height: 2rem;
				margin-bottom: 0.125rem;

				&.invite {
					width: 100%;
					height: 0;
					display: flex;
					justify-content: center;

					u {
						width: 150%;
						position: absolute;
						display: flex;
						align-items: center;
						justify-content: center;
						aspect-ratio: 1/1;
						top: -5.75rem;
						z-index: -1;
						border-radius: 50%;

						&::before {
							content: '';
							inset: 0;
							aspect-ratio: 1/1;
							position: absolute;
							animation: inviteRotate 5s ease infinite;
							background: url('@/assets/svg/tabbar/tab/ring-outside-25.svg');
							background-position: center;
							background-repeat: no-repeat;
							background-size: 60%;
						}

						&::after {
							content: '';
							inset: 0;
							position: absolute;
							animation: inviteRotate 5s ease infinite reverse;
							background: url('@/assets/svg/tabbar/tab/ring-inside-25.svg');
							background-position: center;
							background-repeat: no-repeat;
							background-size: 50%;
						}

						b {
							z-index: 1;
							width: 100%;
							height: 100%;
							position: relative;
							background: url('@/assets/svg/tabbar/tab/bg-flexible-25.svg');
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							img {
								width: 35%;
								aspect-ratio: 1/1;
								filter: grayscale(0);
							}
						}
					}
				}

				.tab-icon {
					width: 100%;
					filter: grayscale(1);
				}
			}

			&.active {
				color: var(--ep-color-text-navigation-selected);
				animation: tabBtnAnimation 500ms;

				.tab-icon-warp {

					.tab-icon {
						filter: grayscale(0);
					}
				}
			}
		}

		span {
			font-size: .625rem;
			font-weight: 500;
		}
	}
}

@media (min-width: 540px) {
  .main-layout {
    .main-content {
      padding-bottom: 0;
    }
  }

  nav {
		display: none;
	}
}

@keyframes tabBtnAnimation {
	0% {
		transform: scale(0);
	}

	50% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes inviteRotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
