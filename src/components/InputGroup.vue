<template>
  <Group
    :value="myValue"
    :gutter="gutter"
    :span="span"
    :button-disabled="buttonDisabled"
    :max-item="maxItem"
    :inline="inline"
    :disabled="disabled"
    class="input-group"
    :class="classes"
    @add="handleAdd"
    @remove="handleRemove">
    <template slot-scope="scope">
      <ElInput v-bind="$props" :value="scope.item" @change="handleChange(scope.index,$event)"/>
    </template>
  </Group>
</template>
<script>
  import {Input} from 'element-ui'
  import Group from './Group'
  export default {
    name: 'InputGroup',
    components: {
      ElInput: Input,
      Group
    },
    props: {
      ...Input.props, // 继承Input的所有属性
      ...Group.props,
      inline: {
        type: Boolean,
        default: false
      },
      gutter: {
        type: Number,
        default: 0
      }
    },
    computed: {
      classes () {
        return {
          'textarea-group': this.type === 'textarea'
        }
      }
    },
    watch: {
      value (value) {
        this.myValue = value
      }
    },
    data () {
      let myValue = this.value
      if (!this.value || this.value.length === 0) {
        myValue = ['']
      }
      return {
        myValue
      }
    },
    methods: {
      handleChange (index, value) {
        let valueClone = [...this.myValue]
        valueClone[index] = value
        this.$emit('input', valueClone).$emit('change', valueClone)
      },
      handleAdd (index) {
        this.myValue.push(index)
      },
      handleRemove (index) {
        let valueClone = [...this.myValue]
        valueClone.splice(index, 1)
        this.$emit('input', valueClone).$emit('change', valueClone)
      }
    }
  }
</script>
<style lang="less">
.input-group{
  max-width:500px;
}
.textarea-group{
  .btn-icon{
    position:absolute;
    min-height: 100%;
  }
}
</style>
