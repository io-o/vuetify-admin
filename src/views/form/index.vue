<template>
  <div class="app-container">
    <v-btn color="primary">测试</v-btn>
    <v-btn color="primary">Primary</v-btn>
  </div>
</template>

<script type="text/javascript">
// import baseJson from '@/assets/json/base.json'
export default {

  data() {
    return {
      value: {}
      // formConfig: {
      //   formItemList: baseJson.input
      // }
    }
  },

  methods: {
    handleClick() {
      console.log(this.value)
    }
  }
}
</script>
