<template>
  <div class="link-label">
    <ElRadioGroup v-model="myType" @change="handleChange" :disabled="disabled">
      <ElRadio :label="item.value" v-for="(item, index) in options" :key="index">{{item.label}}</ElRadio>
    </ElRadioGroup>
    <ElInput v-model="myValue" auto-complete="off" @change="handleChange" class="code-input" :placeholder="$attrs.placeholder || ''" :disabled="disabled"></ElInput>
    <ElTooltip class="item" effect="dark" :content="option.tips" placement="right" v-if="option.tips">
      <div class="tips">
        <i class="el-icon-question"/>
      </div>
    </ElTooltip>
  </div>
</template>
<script>
export default {
  name: 'CheckoutGroup',
  props: {
    value: {
      type: String,
      default: ''
    },
    channel: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    type: {
      type: [Number, String],
      default: 0
    },
    data: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    options() {
      if (this.options && this.options[0]) {
        this.myType = this.options[0].value || 0
      }
    },
    value() {
      this.myValue = this.value
    }
  },
  computed: {
    option: function() {
      return this.options.find(item => item.value === this.myType)
    }
  },
  data() {
    return {
      myValue: this.value,
      myType: this.type
    }
  },
  methods: {
    handleChange() {
      if (this.myValue && this.myType !== undefined) {
        if (this.option.api) {
          this.option
            .api({ [this.option.typeName]: this.myType, [this.option.valueName]: this.myValue }, { errorMsg: 'none' })
            .subscribe(
              res => {
                this.handleSuccess()
              },
              error => {
                this.handleError(error)
              }
            )
        } else if (this.option.pattern) {
          if (this.option.pattern.test(this.myValue)) {
            this.handleSuccess()
          } else {
            this.handleError({})
          }
        }
      } else {
        this.$emit('input', '')
      }
    },
    handleSuccess() {
      this.$emit('update:type', this.myType)
      this.$emit('input', this.myValue)
      let context = this.$parent || this.$root
      context.validateDisabled = true
      context.validateMessage = ''
      context.validateState = 'success'
    },
    handleError(error) {
      this.$emit('update:type', this.myType)
      this.$emit('input', '')
      let context = this.$parent || this.$root
      context.validateDisabled = false
      context.validateMessage = error.responseText || '验证错误'
      context.validateState = 'error'
    }
  }
}
</script>
<style lang="less" scoped>
@import './styles/var';
.link-label {
  .el-radio-group {
    margin: 8px 0;
    display: block;
  }
  .code-input {
    width: 200px;
  }
  .tips {
    height: 32px;
    margin-left: 10px;
    display: inline-block;
    .el-icon-question {
      vertical-align: middle;
      font-size: 22px;
      color: @color-sub;
    }
  }
}
</style>
