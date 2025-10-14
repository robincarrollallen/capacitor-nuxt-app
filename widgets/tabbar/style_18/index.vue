<script setup lang="ts">
import { tabbarList } from "../data"
</script>

<template>
  <nav>
    <NuxtLink v-for="item in tabbarList" :key="item.path" active-class="active" replace :to="item.path">
      <div class="tab-icon-warp" :class="{ invite: !item.path }">
        <u v-if="!item.path" @click="navigateTo('/activity/invite')">
          <i />
        </u>
        <van-image v-else class="tab-icon" :src="item.icon" :show-loading="false" />
      </div>
      <span class="tab-label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="less">
@media (max-width: 539px) {
	nav {
		background: url('@/assets/svg/tabbar/bg-18.svg') no-repeat;
		background-size: 100% 100%;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 4.125rem;
		aspect-ratio: 8/1;
		display: grid;
		z-index: 9;
		grid-template-columns: repeat(5, 1fr);

		a {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
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
					width: 70%;
					max-width: 3.5rem;

					u {
						position: absolute;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						aspect-ratio: 1/1;
						top: -2.2rem;
						z-index: 0;
						background: linear-gradient(90deg,var(--ep-color-background-fill-gradients-primary-a),var(--ep-color-background-fill-gradients-primary-b));
						border-radius: 50%;

						&::before {
							content: '';
							position: absolute;
							top: .1rem;
							left: .1rem;
							bottom: .1rem;
							right: .1rem;
							background: var(--ep-color-background-fill-surface-raised-L2);
							border-radius: 50%;
						}

						&::after {
							content: '';
							position: absolute;
							inset: 0;
							animation: inviteRotate 5s linear infinite;
							background: url('https://yo.qu6.xyz/assets/tab-move1-CuSYYZkd.png');
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 100% 100%;
						}

						i {
							z-index: 1;
							width: 80%;
							height: 80%;
							position: relative;
							background: url('https://yo.qu6.xyz/assets/flexible-1-BvyCopiC.png');
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 100% 100%;
						}
					}
				}

				.tab-icon {
					filter: grayscale(1);
				}
			}

			&.active {
				color: var(--ep-color-text-navigation-selected);
				animation: tabBtnAnimation 500ms;

				.tab-icon-warp {
					padding: 0.1rem;
					border-radius: .25rem;
					background: linear-gradient(to bottom, var(--ep-color-background-fill-glow-primary-opacity-100) 0%, var(--ep-color-background-fill-gradients-primary-a) 100%);

					&::after {
						content: '';
						position: absolute;
						top: .05rem;
						left: .05rem;
						bottom: .05rem;
						right: .05rem;
						background: radial-gradient(70% 50% at 50% 100%,var(--ep-color-background-fill-glow-primary-opacity-100),var(--ep-color-background-fill-surface-raised-L2));
						border-radius: .25rem;
					}

					.tab-icon {
						display: absolute;
						z-index: 1;
						width: 100%;
						height: 100%;
						filter: grayscale(0);
					}
				}
			}
		}

		.tab-label {
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
