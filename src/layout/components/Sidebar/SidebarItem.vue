<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item)">
      <app-link :to="onlyOneChild.url">
        <el-menu-item
          :index="onlyOneChild.url"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item :icon="onlyOneChild.icon" :title="generateTitle(onlyOneChild.name)" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="item.name" popper-append-to-body>
      <template slot="title">
        <item :icon="item.icon" :title="generateTitle(item.name)" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.name"
        :is-nest="true"
        :item="child"
        :base-path="child.url"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      // if (showingChildren.length === 1) {
      //   return true;
      // }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },

    generateTitle
  }
};
</script>
