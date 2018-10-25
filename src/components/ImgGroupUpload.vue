<template>
  <PreviewBox class="img-group-upload">
    <div class="img-group-item" v-if="myValue" v-for="(item, index) in myValue" :key="index" :style="style">
      <button type="button">
        <img :src="item" />
      </button>
      <i @click="handleRemove(index)" class="el-icon-close"></i>
      <i @click="handleMoveLeft(index)" v-show="index > 0" class="el-icon-arrow-left"></i>
      <i @click="handleMoveRight(index)" v-show="index < myValue.length - 1" class="el-icon-arrow-right"></i>
    </div>
    <template v-if="!$listeners.add">
      <ImgUpload
        class="img-group-add"
        :style="style"
        v-if="!myDisabled"
        :multiple="multiple"
        :height="height"
        :width="width"
        :size="size"
        :headers="headers"
        :action="action"
        :disabled="myDisabled"
        :validate-event="false"
        :is-crop="isCrop"
        :crop-props="cropProps"
        :data="data"
        @change="handleChange"/> 
    </template>
    <template v-else >
      <div v-if="!myDisabled" @click="handle" class="img-group-add" :style="style">
        <button type="button"><i class="el-icon-plus"></i></button>
      </div>
    </template>
  </PreviewBox>
</template>

<script>
import ImgUpload from './ImgUpload'
import PreviewBox from './PreviewBox'
export default {
  name: 'ImgGroupUpload',
  components: {
    ImgUpload,
    PreviewBox
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 150
    },
    height: {
      type: [Number, String],
      default: 150
    },
    limit: {
      type: Number,
      default: 0
    },
    size: {
      type: Number
    },
    headers: {
      type: Object
    },
    action: {
      required: false,
      default: '/cdnadmin/admin/upload/uploadPic_json.json'
    },
    isCrop: {
      type: Boolean,
      default: false
    },
    cropProps: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  computed: {
    style() {
      return {
        width: typeof this.width === 'string' ? this.width : parseInt(this.width) + 2 + 'px',
        height: typeof this.height === 'string' ? this.width : parseInt(this.height) + 2 + 'px'
      }
    }
  },
  watch: {
    value(value) {
      this.myDisabled = !!this.limit && (this.value.length >= this.limit || this.myValue.length >= this.limit)
      this.myValue = value
      
    }
  },
  data() {
    return {
      myDisabled: !!this.limit && this.value.length >= this.limit,
      myValue: this.value
    }
  },
  methods: {
    handleChange(data) {
      if (this.myValue && !this.myDisabled) {
        this.myValue.push(data.url)
        this.change()
      }
    },
    handleRemove(index) {
      this.myValue.splice(index, 1)
      this.change()
    },
    change() {
      this.$emit('change', this.myValue).$emit('input', this.myValue)
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', this.myValue)
        this.dispatch(this, 'ElFormItem', 'el.form.blur', this.myValue)
      }
    },
    handle() {
      this.$emit('add')
    },
    handleMoveLeft(index) {
      let arr = Object.assign([], this.myValue)
      const str = arr[index]
      arr[index] = arr[index - 1]
      arr[index - 1] = str
      this.myValue = arr
      this.change()
    },
    handleMoveRight(index) {
      let arr = Object.assign([], this.myValue)
      const str = arr[index]
      arr[index] = arr[index + 1]
      arr[index + 1] = str
      this.myValue = arr
      this.change()
    },
    dispatch(context, componentName, eventName, params) {
      var parent = context.$parent || context.$root
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
</script>
<style lang="less">
@import './styles/var';
.img-group-upload {
  margin-bottom: 10px;
}
.img-group-add {
  border: 1px dashed @border-color-base;
  display: inline-block;
  height: 150px;
  width: 150px;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  &:hover {
    // border-color: @color-primary;
    .el-icon-plus {
      font-size: 28px;
      color: @color-primary;
    }
  }
  box-sizing: border-box;
  button {
    border: 0;
    outline: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    cursor: pointer;

    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.img-group {
  &-upload {
    margin-top: 10px;
    .el-upload-list {
      display: none;
    }
    .avatar-uploader {
      margin-bottom: 10px;
    }
  }
  &-item {
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid @border-color-base;
    vertical-align: middle;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    position: relative;
    button {
      border: 0;
      background: transparent;
      height: 100%;
      width: 100%;
      outline: none;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .el-icon-close {
      position: absolute;
      top: -18px;
      right: -18px;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:before {
        z-index: 100;
        position: absolute;
        right: 5px;
        top: 5px;
      }
      &:after {
        border: 18px solid transparent;
        content: '';
        right: 0;
        top: 0;
        position: absolute;
        border-top-color: #999;
        border-right-color: #999;
      }
      &:hover {
        &:after {
          border-top-color: #ff4949;
          border-right-color: #ff4949;
        }
      }
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      position: absolute;
      display: none;
      z-index: 100;
      top: 50%;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      background: @color-black;
      color: @color-white;
      transform: translateY(-50%);
    }
    .el-icon-arrow-left {
      left: 10px;
    }
    .el-icon-arrow-right {
      right: 10px;
    }
    &:hover {
      .el-icon-arrow-left,
      .el-icon-arrow-right {
        display: block;
      }
      .el-icon-close {
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
