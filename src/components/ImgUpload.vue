<template>
  <div>
    <PreviewBox :title="title" :class="{'img-upload': !$slots.default,'img-upload-value': !$slots.default&&value}" v-loading="loading" :style="style">
      <button v-if="!$slots.default" type="button">
        <i @click="handleRemove" class="el-icon-close"></i>
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </button>
      <el-upload
        v-if="isCrop"
        ref="upload"
        :action="uploadUrl"
        :name="name"
        :data="data"
        :auto-upload="false"
        :before-upload="handleBeforeUpload"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError"
        :multiple="false">  
          <slot v-if="$slots.default"></slot>
          <button type="button" class="img-upload-value-button" v-if="!$slots.default&&value">修改</button>
      </el-upload>
      <el-upload
        v-else
        ref="upload"
        v-bind="$props"
        :action="uploadUrl"
        :name="name"
        :data="data"
        :auto-upload="false"
        :before-upload="handleBeforeUpload"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError">  
          <slot v-if="$slots.default"></slot>
          <button type="button" class="img-upload-value-button" v-if="!$slots.default && value">修改</button>
      </el-upload>
    </PreviewBox>
    <div class="el-upload__tip" v-if="isTip">图片尺寸为{{data.maxWidth || data.width}}*{{data.maxHeight || data.height}},文件大小请不要超过{{Math.floor(data.maxSize / 1024)}}kb.</div>
  </div>
</template>
<script>
import PreviewBox from './PreviewBox'
import { Upload } from 'element-ui'
let props = { ...Upload.props }
delete props.onSuccess
delete props.beforeUpload
delete props.onProgress
delete props.onError
export default {
  name: 'ImgUpload',
  components: {
    PreviewBox
  },
  props: {
    ...props,
    isTip: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/png'
    },
    size: {
      type: Number,
      default: 1024 * 1024 * 5
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    formatList: {
      type: Array,
      default() {
        return ['.png', '.jpeg', '.jpg']
      }
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
    },
    name: {
      type: String,
      default: 'data'
    },
    width: {
      type: [String, Number],
      default: 148
    },
    height: {
      type: [String, Number],
      default: 148
    }
  },
  data() {
    return {
      loading: false,
      title: document.all ? '可能要双击才能选择文件' : ''
    }
  },
  computed: {
    uploadUrl: function() {
      const prefix = process.env.NODE_ENV === 'development' ? '/api' : ''
      return `${prefix}${this.action}`
    },
    style() {
      return {
        width: typeof this.width === 'string' ? this.width : parseInt(this.width) + 2 + 'px',
        height: typeof this.height === 'string' ? this.width : parseInt(this.height) + 2 + 'px'
      }
    }
  },
  methods: {
    handleBeforeUpload(file) {
      let formatReg = new RegExp(this.formatList.join('|'), 'i')
      if (file.size > this.size) {
        this.$message.error(`上传的文件不能超过${this.size / 1024 / 1024}M`)
        return false
      }
      if (!formatReg.test(file.name)) {
        this.$message.error('图片格式不正确,请重新上传')
        return false
      }
      if (this.disabled) {
        return false
      }
      if (this.data && (this.data.maxHeight || this.data.maxWidth || this.data.height || this.data.width)) {
        let _this = this
        function loadImageAsync(url) {
          return new Promise(function(resolve, reject) {
            var image = new Image()
            image.onload = function() {
              let imgInfo = {
                height: this.height,
                width: this.width
              }
              if (imgInfo.height > _this.data.maxHeight || imgInfo.width > _this.data.maxWidth) {
                _this.$message.error(
                  `图片尺寸限制为最大宽度${_this.data.maxWidth}, 最大高度${_this.data.maxHeight}，请重新上传`
                )
                reject()
              } else if (_this.data.height && _this.data.width) {
                if (_this.data.height === imgInfo.height && _this.data.width === imgInfo.width) {
                  resolve()
                } else {
                  _this.$message.error(`图片尺寸限制为${_this.data.width}*${_this.data.height}，请重新上传`)
                  reject()
                }
              } else {
                _this.data.width = imgInfo.width
                _this.data.height = imgInfo.height
                resolve()
              }
            }
            image.src = url
          })
        }
        function loadReaderAsync(evt) {
          return new Promise(function(resolve, reject) {
            let reader = new FileReader()
            reader.onload = function(src) {
              resolve(loadImageAsync(src.target.result))
            }
            reader.readAsDataURL(evt)
          })
        }
        return loadReaderAsync(file)
      }
    },
    handleProgress() {
      this.loading = true
    },
    handleSuccess(res) {
      this.loading = false
      if (res.errorCode === '0') {
        let url = res.url
        this.$emit('change', res)
          .$emit('success', url)
          .$emit('input', url)
          .$emit('blur')
        if (this.validateEvent) {
          // 触发表单校验
          this.dispatch(this, 'ElFormItem', 'el.form.change', [url])
          this.dispatch(this, 'ElFormItem', 'el.form.blur', [url])
        }
      } else {
        this.$emit('exception', res)
        this.$message.error(res.errorMsg || '文件上传失败')
      }
    },
    handleError(err, file, fileList) {
      //eslint-disable-line
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    },
    handleRemove() {
      this.$emit('change', '').$emit('input', '')
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', '')
        this.dispatch(this, 'ElFormItem', 'el.form.blur', '')
      }
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
.el-upload__tip {
  margin-top: 0;
}
.is-error .img-upload {
  border-color: @color-error;
}
.img-upload {
  border: 1px dashed @border-color-base;
  display: inline-block;
  height: 150px;
  width: 150px;
  vertical-align: middle;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: @color-primary;
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
    &:hover {
      .el-icon-close {
        top: 0;
        right: 0;
        display: block;
      }
    }
  }
  .el-upload {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    &__input {
      position: absolute\0;
      top: 0\0;
      right: 0\0;
      height: 100%\0;
      width: 100%\0;
      opacity: 0\0;
      display: block\0;
    }
  }
  &-value {
    .el-upload {
      height: 30px;
      bottom: -30px;
      background: rgba(0, 0, 0, 0.6);
      &:hover {
        background: @color-primary;
      }
    }
    &:hover .el-upload {
      bottom: 0px;
    }
    &-button {
      color: #fff;
      height: 30px;
      font-size: 14px;
      i {
        font-size: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>
