<script>
export default {
  name: 'Item',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(
        <v-list-item-icon>
          <v-icon>{ icon }</v-icon>
        </v-list-item-icon>
      )
    }
    if (title) {
      vnodes.push(
        <v-list-item-content>
          <v-list-item-title>{ title }</v-list-item-title>
        </v-list-item-content>
      )
    }
    return vnodes
  }
}
</script>
