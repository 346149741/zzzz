<template>
  <div :class="{'has-logo':showLogo}">
    <!--<logo v-if="showLogo" :collapse="isCollapse" />-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menu"
          :key="route.name"
          :item="route"
          :base-path="route.url"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      menu: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar', 'nowMenu']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return !this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    'nowMenu'() {
      this.getSideMenu()
    }
  },
  created() {
    this.getSideMenu()
  },
  methods: {
    getSideMenu() {
      let arr = JSON.parse(sessionStorage.getItem('menu'))
      arr = this.XEUtil.toArrayTree(arr, {
        strict: false,
        parentKey: 'pid',
        key: 'id',
        children: 'children'
      })
      this.menu = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].pid === this.nowMenu) {
          this.menu.push(arr[i])
        }
      }
    }
  }
}
</script>
