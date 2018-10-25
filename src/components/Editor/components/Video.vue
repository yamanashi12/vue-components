<template>
  <div class="editor-import-video" :class="['upvideo-btn', 'active-default']" >
    <div v-loading="loading" class="file-upload" v-if="!file">
      <el-upload
        v-bind="$props"
        :key="key"
        :data="{token: qiniuToken}"
        :action="action"
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="myFileList"
        accept="video/mp4"
        >
        <el-button class="editor-import-video-btn">
          <i class="el-icon-plus"></i>
          <p>添加视频</p>
        </el-button>
      </el-upload>
    </div>
    <div v-else>
      <video :src="file" crossorigin="anonymous" controls="controls" class="video-tag">
        your browser does not support the video tag
      </video>
    </div>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload'
import * as api from '../Editor.service.js'
// import videoUpload from '@/components/VideoUpload'
export default {
  name: 'EditorViedo',
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
    // api.getVideoToken().subscribe(res => {
    //   this.token = res.uptoken
    // })
  },
  methods: {
    // 上传视频时
    // 上传进度
    handleBeforeUpload(file) {
      // const prefix = process.env.NODE_ENV === 'development' ? 'api' : ''
      // this.uploadUrl = `/${prefix}${this.videoAction}`
      // const verify = this.uploadRules(file)
      // if (verify) {
      //   const qiniu = require('qiniu-js')
      //   console.log(file)
      //   const config = {
      //     useCdnDomain: true,
      //     region: qiniu.region.z2
      //   }
      //   const putExtra = {
      //     fname: "",
      //     params: {},
      //     mimeType: [] || null
      //   }
      //   const observable = qiniu.upload(file, file.name, this.qiniuToken, config, putExtra)
      //   const subscription = observable.subscribe(res => {
      //     console.log(res)
      //   },
      //   error =>{
      //     console.log(error)
      //   }) 
      // }
      return true
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
        this.$emit('on-change', this.file)
        this.$emit('success', this.file)
        this.key = Math.random()
          .toString(36)
          .substr(2)
      } else {
        this.$emit('exception', res)
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
