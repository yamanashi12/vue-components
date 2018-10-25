<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <ImgGroupUpload v-model="fileList"/>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import ImgGroupUpload from '@/components/ImgGroupUpload'
export default {
  name: 'EditorSlideUpload',
  components: { ImgGroupUpload },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('successCBK', this.fileList)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>