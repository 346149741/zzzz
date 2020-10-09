<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link :key="collapse?'collapse':'expand'" class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo">
        <div class="sidebar-title-container">
          <h1 v-if="!collapse" class="sidebar-title">{{ title }} </h1>
          <h1 v-if="!collapse" class="sidebar-title-sub">{{ titleSub }} </h1>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '智慧管网',
      titleSub: '可视化管理平台',
      logo: require('@/assets/common/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;

    &.collapse img {
      margin-bottom: 22px;
    }

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-top: 24px;
      }

      & .sidebar-title-container {
        font-family: MicrosoftYaHei-Bold;
        font-weight: Bold;
        line-height: 20px;
        padding-left: 47px;
        text-align: left;
      }

      & .sidebar-title {
        font-size: 16px;
        color: #1890FF;
        letter-spacing: 1em;
      }

      & .sidebar-title-sub {
        font-size: 12px;
        color: #BABFCB;
        letter-spacing: .4em;
      }

    }
  }
</style>
