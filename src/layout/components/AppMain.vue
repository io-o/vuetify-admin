<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-main
  min-height "calc(%s - %s)" % (100% 64px)
  width 100%
  position relative
  overflow hidden
  padding 20px
</style>
