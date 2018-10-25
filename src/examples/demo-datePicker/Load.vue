<script>
export default {
  name: 'componentName',
  props: {
    componentName: {
      type: String
    }
  },
  data() {
    return {}
  },
  created() {
    this.$options.components[this.componentName] = require(`@/components/Placeholder`).default
  },
  render: function(createElement) {
    return createElement(this.componentName)
  }
}
</script>
