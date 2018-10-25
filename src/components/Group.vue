<template>
  <ElRow class="group" :class="classes" :gutter="gutter">
    <ElCol :span="span" class="group-item" v-for="(item,index) in value" :key="item.key || index">
      <template v-if="simpleLayout">
        <Cellbox class="group-cellbox">
          <CellItem>
            <slot v-if="index < maxItem" v-bind="{item:item,index:index}"></slot>
          </CellItem>
          <CellItem class="group-actions">
            <ElButton icon="el-icon-plus" class="btn-icon" v-if="index===value.length - 1" @click="handleAdd(index)" :disabled="disabled || maxItem <= value.length || buttonDisabled"></ElButton>
            <ElButton icon="el-icon-minus" class="btn-icon" v-if="index!==value.length - 1" @click="handleRemove(index)" :disabled="item.disabled"></ElButton>
          </CellItem>
        </Cellbox>
      </template>
      <template v-else>
        <div if="index < maxItem" class="group-content">
          <slot v-bind="{item:item,index:index}"></slot>
          <el-button icon="el-icon-close" class="btn-icon group-remove" v-if="value.length>1" @click="handleRemove(index)" :disabled=" disabled ||item.disabled"></el-button>
        </div>
        <div class="tr">
          <ElButton icon="el-icon-plus" class="btn-icon" v-if="index===value.length - 1 && maxItem > 1" @click="handleAdd(index)" :disabled="disabled || maxItem <= value.length || buttonDisabled"></ElButton>
        </div>
      </template>
    </ElCol>
  </ElRow>
</template>
<script>
export default {
  name: 'Group',
  props: {
    value: {
      type: [Array],
      default() {
        return []
      }
    },
    maxItem: {
      // 最大项目数
      type: Number,
      default: 100
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    simpleLayout: {
      type: Boolean,
      default: true
    },
    gutter: {
      type: Number,
      default: 20
    },
    span: {
      type: Number,
      default: 24
    },
    inline: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'group-simple': this.simpleLayout,
        'group-inline': this.inline
      }
    }
  },
  methods: {
    handleAdd(index) {
      this.$emit('add', index)
      this.$nextTick(() => {
        // 被添加的表单控件得到焦点
        let node = this.$el.querySelector('.group-item:last-child input[type="text"]')
        node && node.focus()
      })
    },
    handleRemove(index) {
      this.$emit('remove', index)
    }
  }
}
</script>
<style lang="less">
@import './styles/var.less';
.group {
  &-inline {
    .group-cellbox {
      width: auto;
    }
  }
  &-item {
    margin-bottom: 15px;
    &.el-col-24:last-child {
      margin-bottom: 0;
    }
  }
  .btn-icon {
    margin: 10px 0;
    min-width: 20px;
  }
  &-simple {
    .btn-icon {
      margin: 0;
    }
  }
  &-content {
    border: 1px dashed @border-color-base;
    padding: 15px;
    position: relative;
  }
  &-remove {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    margin: 0 !important;
    padding: 5px !important;
    i {
      transform: scale(0.8);
    }
  }
  &-actions {
    position: relative;
    width: 50px;
    .btn-icon {
      margin-left: 10px;
    }
  }
}
</style>
