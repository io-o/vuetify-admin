<template>
  <el-form
    class="dynamic-form"
    :model="value"
    v-bind="formConfig"
  >
    <dynamic-form-item
      v-for="item in formConfig.formItemList"
      v-if="value[item.key]!== undefined"
      :key="item.key"
      :item="item"
      v-bind="item"
      :value="value[item.key]"
      @input="handelInput($event, item.key)"
    />
    <slot />
  </el-form>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.setDefaultValue()
  },

  methods: {
    setDefaultValue() {
      // 设置初始值
      // const formData = { ...this.value }
      this.formConfig.formItemList.forEach(item => {
        const { key, value } = item
        if (this.value[key] === undefined || this.value[key] === null) {
          // formData[key] = value
          this.$set(this.value, key, value)
        }
      })
      // this.$emit('input', this.value)
    },
    handelInput(val, key) {
      this.$set(this.value, key, val)
    }
  }
}
</script>
