<template>
  <div class="layout">
    <AppNav />
    <div class="main">
      <AppHeader />
      <AppMain />
    </div>
  </div>
</template>

<script type="text/javascript">
import AppNav from './components/AppNav/index'
import AppHeader from './components/AppHeader'
import AppMain from './components/AppMain'
export default {
  components: {
    AppNav,
    AppHeader,
    AppMain
  }
}
</script>

<style lang="stylus" scoped>
.layout
  display flex
  .main
    width 100%
</style>
