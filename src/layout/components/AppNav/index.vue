<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item style="height: 64px;">
        <v-list-item-avatar @click.stop="mini = !mini">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>PMKB</v-list-item-title>
      </v-list-item>
      <v-divider />

      <!-- Menu -->
      <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
        <nav-item
          v-for="item in menus"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </vue-perfect-scrollbar>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import NavItem from './NavItem'
import VuePerfectScrollbar from 'vue-perfect-scrollbar' // 优化滚动
export default {
  components: { NavItem, VuePerfectScrollbar },
  data() {
    return {
      drawer: true,
      mini: false,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }
  },

  computed: {
    menus() {
      // 选中的二级菜单默认展开
      const path = this.$route.path.split('/')[1]
      const menus = this._.cloneDeep(this.$store.getters.permission_routes)

      menus.forEach(item => {
        if (item.path.indexOf(path) !== -1) {
          item.active = true
        }
      })
      return menus
    }
  }
}
</script>
