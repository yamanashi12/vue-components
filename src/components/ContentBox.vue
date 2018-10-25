<template>
  <div class="content-box">
    <div class="title" v-if="title" v-text="title"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    title: {
      type: String
    }
  }
}
</script>
<style lang="less">
@import './styles/var.less';
.content-box {
  padding: 15px 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background: @color-white;
  &::after{
    content: '';
    clear: both;
    display: table;
  }
  &:last-child{
    margin-bottom: 0
  }
  .title{
    margin-bottom: 10px;
    line-height: 1;
    font-size: 18px;
  }
} 
</style>

