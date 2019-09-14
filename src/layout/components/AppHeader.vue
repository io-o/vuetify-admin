<template>
  <div class="header">
    <v-toolbar color="primary darken-1" dark>
      <v-breadcrumbs
        :items="items"
        divider=">"
      >
        <template v-slot:item="props">
          <v-breadcrumbs-item
            :class="[props.item.disabled && 'disabled']"
            @click.prevent="handleLink(props)"
          >
            {{ props.item.meta.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div class="flex-grow-1" />
      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        <!-- <span>Admin</span> -->
      </v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text large v-on="on">{{ name }}</v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item-group>
            <v-list-item @click.prevent="goPersonal">
              <v-list-item-title>个人中心</v-list-item-title>
            </v-list-item>
            <v-list-item @click.prevent="loginOut">
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar>

  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    items: []
  }),
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  watch: {
    '$route': {
      handler(newV) {
        const matched = newV.matched.filter(item => item.meta && item.meta.title)
        const res = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched.filter(item => item.path !== '' && item.path !== '/dashboard'))
        res[res.length - 1].disabled = true
        this.items = res
      },
      immediate: true
    }
  },

  methods: {
    async loginOut() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // 清空路由
      this.$store.state.permission.routes = []
    },

    handleLink({ item }) {
      this.$router.push({ path: item.path })
    },

    goPersonal() {
      this.$router.push({ path: '/personal' })
    }
  }
}
</script>

<style lang="stylus">
.header
  width 100%
  .v-breadcrumbs__item
    color white
    cursor pointer
.disabled .v-breadcrumbs__item
  color #A6B4C7
  cursor not-allowed
</style>
