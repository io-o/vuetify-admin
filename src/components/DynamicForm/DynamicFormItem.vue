<template>
  <el-form-item
    :label="item.label"
    :prop="item.key"
    :rules="item.rules"
  >
    <el-input
      v-if="item.type === 'input'"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'DynamicFormItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
