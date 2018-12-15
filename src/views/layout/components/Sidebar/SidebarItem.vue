<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <!--<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].title" slot="title">{{generateTitle(item.children[0].title)}}</span>
        </el-menu-item>
      </router-link> v-else执行下面语句-->

      <el-submenu :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.name" slot="title">{{generateTitle(item.name)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.name" slot="title">{{generateTitle(child.name)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>

