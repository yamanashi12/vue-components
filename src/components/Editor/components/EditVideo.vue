<template>
   <div v-loading="loading" class="file-upload">
    <el-upload
      v-bind="$props"
      :key="key"
      :data="{token: qiniuToken}"
      :action="action"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      accept="video/mp4"
      >
      <el-button class="editor-import-video-btn">
        <i class="el-icon-plus"></i>
        <p>添加视频</p>
      </el-button>
    </el-upload>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload'
import * as api from '../Editor.service.js'
// import videoUpload from '@/components/VideoUpload'
export default {
  name: 'EditorEditViedo',
  components: { FileUpload },
  props: {
    item: {
      type: Object
    },
    qiniuToken: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      maxfileSize: 5*1024*1024,
      key: Math.random()
        .toString(36)
        .substr(2),
      loading: false,
      action: '//upload.qiniup.com/',
      file: this.item.value
    }
  },
  mounted() {
  },
  methods: {
    handleBeforeUpload(file) {
      const prefix = process.env.NODE_ENV === 'development' ? 'api' : ''
      this.uploadUrl = `/${prefix}${this.videoAction}`
      return this.uploadRules(file)
    },
    uploadRules (file) {
      let size = file.size / 1024 / 1024
      if (this.maxfileSize && size > this.maxfileSize) {
        this.$message.error(`上传文件大小限制最大${this.maxfileSize}MB`)
        return false
      }
      let fileType = /\.\w+$/.exec(file.name)[0]
      if (!this.fileAccept) {
        return true
      }
      if (fileType && this.fileAccept.split(',').indexOf(fileType) > -1) {
        return true
      } else {
        this.$message.error(`上传文件格式不正确,请上传${this.fileAccept}格式文件`)
        return false
      }
    },
    handleProgress() {
      this.loading = true
    },
    // 删除文件
    removeFile() {
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', { type: 'warning' })
        .then(() => {
          this.showUpdateBtn = true
          this.file = ''
          this.form.path = ''
        })
        .catch(() => {})
    },
    
    handleSuccess(res) {
      this.loading = false
      if (res.key && res.hash) {
        this.file = '//image.yunjiweidian.com/' + res.key
        this.item.value = this.file
        this.$emit('updata:item', this.item)
        this.key = Math.random()
          .toString(36)
          .substr(2)
      } else {
        if (res) {
          if (!this.$listeners.exception) {
            this.$message.error(res.msg || '文件上传失败')
          }
        }
      }
    },
    handleError(err, file, fileList) {
      //eslint-disable-line
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    }
  }
}
</script>
<style lang="less">
@import '../../styles/var';
.editor-import-video{
  .file-upload{
    display: block;
    .el-upload{
      width: 100%;
      .editor-import-video-btn{
        width: 100% !important;
        height: 100px;
        display: block;
        .el-icon-plus{
          font-size: 28px;
          color: #8c939d;
        }
        &:hover {
          .el-icon-plus {
            font-size: 28px;
            color: @color-primary;
          }
        }
      }
    }
  }
  .video-tag{
    width: 100%;
  }
}
</style>
