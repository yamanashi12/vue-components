<template>
  <el-input-number
    class="input-money"
    v-bind="$props"
    :value="myValue"
    :min="myMin"
    :max="myMax"
    :bit="bit"
    :validateEvent="false"
    @change="handleChange"/>
</template>

<script>
import {InputNumber} from 'element-ui'
export default {
  name: 'InputMoney',
  props: {
    ...InputNumber.props,
    bit: {
      type: Number,
      default: 0.01
    },
    max: {
      type: Number,
      default: 9999900
    },
    min: {
      type: Number,
      default: 0
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (value) {
      let val = value / 100
      if (val < this.myMin) {
        val = this.myMin
      }
      if (val > this.myMax) {
        val = this.myMax
      }
      this.myValue = val
    },
    min (value) {
      let val = value / 100
      val = val <= this.myMax ? val : this.myMax
      this.myMin = val
    },
    max (value) {
      let val = value / 100
      val = val > this.myMin ? val : this.myMin
      this.myMax = val
    }
  },
  data () {
    return {
      myMax: this.max ? this.max / 100 : this.max,
      myMin: this.min ? this.min / 100 : this.min,
      myValue: this.value / 100
    }
  },
  methods: {
    handleChange (value) {
      value = Math.round(value * 100)
      this.$emit('input', value).$emit('change', value).$emit('blur', value)
      if (this.validateEvent) { // 触发表单校验
        this.dispatch('ElFormItem', 'el.form.change', [value])
        this.dispatch('ElFormItem', 'el.form.blur', [value])
      }
    }
  }
}
</script>
<style lang="less">
@import './styles/var.less';
.input-money{
  position:relative;
  &:before{
    content: '￥';
    position: absolute;
    top: 50%;
    left: 2px;
    z-index: 10;
    color: #999;
    line-height: 12px;
    margin-top: -6px;
  }
  &.nounit:before{
    content: ''
  }
  .el-input input{
    padding-left:15px!important;
  }
}
</style>
