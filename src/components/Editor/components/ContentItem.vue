<template>
  <div class="Editor-area-content-item" @click="handleSelect">
    <slot :item="item" :index="index"></slot>
  </div>
</template>
<script>
export default {
  name: 'EditorContentItem',
  props: {
    index: {
      type: [Number, String]
    },
    item: {
      type: [Object],
      default: {}
    }
  },
  methods: {
    handleRemove () {
      this.$emit('remove', this.index)
    },
    handleMoveTop () {
      this.$emit('moveTop', this.index)
    },
    handleMoveBottom () {
      this.$emit('moveBottom', this.index)
    },
    handleSelect () {
      this.$emit('select', this.index)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/var.less';
.Editor-area-content-item{
  width: 100%;
  border: 1px dashed transparent;
  border-bottom: 1px dashed @border-color-base;
  .center {
    text-align: center;
  }
  &:hover,
  &.active {
    border: 1px dashed @color-primary;
  }
}
</style>
