<template>
  <ElDialog :visible="visible" custom-class="dialog-preview" :before-close="handleClose" size="full">
    <ElCarousel :initial-index="index" :autoplay="false" ref="carousel">
      <ElCarousel-item v-for="(item, index) in list" :key="index">
        <button type="button" class="dialog-preview-image">
          <img :src="item"/>
        </button>
      </ElCarousel-item>
    </ElCarousel>
  </ElDialog>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    visible (value) {
      if (!value) {
        this.$destroy()
      }
    }
  },
  destroyed () {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
@import './styles/var.less';
.dialog-preview{
  background:transparent;
  box-shadow:none;
  transform:none;
  top:0!important;
  left:0;
  width: 100%;
  height: 100%;
  margin-top: 0 !important;
  &-image{
    height:100%;
    width:100%;
    background:transparent;
    border:0;
    img{
      background:#fff;
    }
  }
  .el-dialog__body,.el-dialog__header{
    padding:0;
  }
  .el-dialog__body{
    height:100%;
    width:100%;
    top:0;
    left:0;
    position:absolute;
  }
  .el-carousel,.el-carousel__container{
    height:100%;
  }
  .el-dialog__headerbtn{
    right:15px;
    top:15px;
    position:absolute;
    z-index:1000;
    font-size:18px;
    color:#fff;
    .el-dialog__close{
      font-size: 40px;
      color: @color-white
    }
  }
}
</style>
