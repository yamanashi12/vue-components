<template>
  <cellbox class="placeholder" middle>
    <cell-item>
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <cellbox middle class="placeholder-img-wrapper">
          <cell-item>
            <img v-if="src != 'none'" :src="src">
          </cell-item>
        </cellbox>
        <div class="placeholder-text weak">
          <slot v-if="$slots.text" name="text"></slot>
          <template v-else>
            {{text}}
          </template>
        </div>
        <slot v-if="$slots.button" name="button"></slot>
      </template>
    </cell-item>
  </cellbox>
</template>

<script>
import placeholderImg from './placeholder.png'
export default {
  componentName: 'EPlaceholder',
  props: {
    src: {
      type: String,
      default: placeholderImg
    },
    text: {
      type: String,
      default: '没有相关数据'
    }
  }
}
</script>
<style lang="less" scoped>
.placeholder{
  text-align:center;
  margin:30px 0;
  &-text{
    margin-top: -30px;
    margin-bottom: 15px;
  }
  &-img-wrapper{
    height: 200px;
  }
  .el-button{
    margin-top:0!important;
  }
  img{
    max-height:160px;
  }
}
</style>
