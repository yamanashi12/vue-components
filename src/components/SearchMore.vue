<template>
  <div class="search-more">
    <slot v-if="show"></slot>
    <div 
      class="search-more-toggle" 
      :class="{'is-open':show}"
      @click="show = !show"
      v-text="show?'收起更多':'更多筛选'"></div>
  </div>
</template>

<script>
export default {
  name: 'SearchMore',
  data () {
    return {
      show: false
    }
  }
}
</script>
<style lang="less">
@import './styles/var';
.search-more {
  display: contents;
  &-toggle{
    display: inline-block;
    margin-right: 20px;
    color: @color-primary;
    line-height: 32px;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      right: -10px;
      top: 50%;
      width: 0;
      height: 0;
      margin-top: -2px;
      border-right: 4px transparent solid;
      border-left: 4px transparent solid;
      border-top: 5px @color-primary solid;
    }
    &.is-open{
      &::after{
        border-top: 0;
        border-bottom: 5px @color-primary solid;
      }
    }
  }
} 
</style>

