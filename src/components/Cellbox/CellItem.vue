<template>
  <component :is="tag||$parent.itemTag" class="cell-item" :style="styles">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CellItem',
  props: {
    tag: {
      type: [String, Object]
    }
  },
  computed: {
    styles () {
      return this.$parent.gutter ? {
        'padding-left': this.$parent.gutter / 2 + 'px',
        'padding-right': this.$parent.gutter / 2 + 'px'
      } : {}
    }
  }
}
</script>
<style lang="less" scoped>
@import './cellbox';
</style>