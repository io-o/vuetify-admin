<template>
  <div class="app-container">
    数据采集{{ $route.query.id }}
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

    }
  },

  created() {
    console.log(this.$route.query)
  },

  methods: {

  }
}
</script>
