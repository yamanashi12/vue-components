<template>
  <div class="multiple-cascader">
    <el-cascader
      :style="cascaderStyle"
      ref="multipleCascader"
      v-model="selectValue"
      v-bind="$props"
      @change="handleChange">
    </el-cascader>
    <div class="tag-list" ref="multipleTag" :style="{'max-width': inputWidth + 'px'}" v-show="myValue.length > 0">
      <el-tag
        v-for="(tag, index) in myValue"
        :key="tag.value"
        closable
        :type="tagType"
        size="mini"
        @close="handleClose(index)">
        {{tag.label}}
      </el-tag>
    </div>
  </div>
</template>
<script>
import { Cascader } from 'element-ui'
let props = Cascader.props
delete props.value
delete props.change
export default {
  name: 'MultipleCascader',
  props: {
    ...props,
    value: {
      type: Array,
      default: () => []
    },
    type: {
      // value object
      type: [String],
      default: 'value'
    },
    tagType: {
      type: String,
      default: 'info'
    }
  },
  watch: {
    value() {
      if (this.type === 'object') {
        this.myValue = this.value
      }
    }
  },
  data() {
    return {
      myValue: this.type === 'object' ? this.value : [],
      cascaderStyle: {},
      selectValue: [],
      inputWidth: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.inputWidth = this.$refs.multipleCascader.$el.clientWidth
      this.cascaderStyle = this.setStyle()
    })
  },
  methods: {
    handleChange(val) {
      if (!this.myValue.find(item => item.value === val[val.length - 1])) {
        this.myValue.push({
          value: val[val.length - 1],
          label: this.$refs.multipleCascader.currentLabels[val.length - 1]
        })
        this.returnValue()
      }
      this.$nextTick(() => {
        this.cascaderStyle = this.setStyle()
      })
      this.selectValue = []
    },
    handleClose(index) {
      this.myValue.splice(index, 1)
      this.returnValue()
      setTimeout(() => {
        this.cascaderStyle = this.setStyle()
      }, 300)
    },
    setStyle() {
      let height = this.$refs.multipleTag.clientHeight
      return {
        'padding-top': height + 'px'
      }
    },
    returnValue() {
      if (this.type === 'object') {
        this.$emit('input', this.myValue)
      } else {
        let val = []
        this.myValue.forEach(item => {
          val.push(item.value)
        })
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style lang="less">
@import './styles/var';
.multiple-cascader {
  position: relative;
  .tag-list {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 5px 0 5px;
  }
  .el-cascader {
    width: 300px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .el-input__inner {
      border: 0;
      transform: none;
    }
  }
  .el-tag {
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
</style>
