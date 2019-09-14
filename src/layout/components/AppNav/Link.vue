<template>
  <div v-bind="linkProps(to)">
    <slot />
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(path) {
      if (isExternal(path)) {
        return {
          is: 'a',
          target: '_blank',
          href: path
        }
      } else {
        return {
          is: 'v-list-item',
          to: path
        }
      }
    }
  }
}
</script>
