<template>
  <v-list v-if="!item.hidden" nav dense subheader>
    <template
      v-if="hasOneShowingChild(item.children,item) &&
        (!onlyOneChild.children||onlyOneChild.noShowingChildren)
        &&!item.alwaysShow"
    >
      <page-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <item
          :icon="onlyOneChild.meta.icon||(item.meta && item.meta.icon)"
          :title="onlyOneChild.meta.title"
        />
      </page-link>
    </template>
    <template v-else>
      <v-list-group
        v-model="item.active"
        :index="resolvePath(item.path)"
        :prepend-icon="item.meta.icon ? item.meta.icon : ''"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.meta.title" />
          </v-list-item-content>
        </template>
        <nav-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import path from 'path'
import PageLink from './Link'
import Item from './Item'
import { isExternal } from '@/utils/validate'
export default {
  name: 'NavItem',
  components: { PageLink, Item },
  props: {
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
      default: ''
    }
  },

  data() {
    this.onlyOneChild = null
    return {}
  },

  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
