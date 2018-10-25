<template>
  <ContentBox label="文件上传">
    <div class="demo-box">
      <FileUpload
        action="/api/textadmin/admin/batchImportWhiteList.json"
        name="uploadExcel"
        :show-file-list="true"
        :file-list.sync="files1"
        fileAccept=".xls,.xlsx"
        :maxfileSize='10'>
        <el-button>导入文件</el-button>
    </FileUpload>
    </div>
    <h2>Attribute</h2>
    <ElTable border :data="attribute">
      <ElTableColumn prop="parame" label="参数"/>
      <ElTableColumn prop="text" label="说明">
        <template slot-scope="scope">
          <span v-html="scope.row.text"></span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="type" label="参数类型"/>
      <ElTableColumn prop="value" label="可选值"/>
      <ElTableColumn prop="default" label="默认值"/>
    </ElTable>
  </ContentBox>
</template>
<script>
import FileUpload from '@/components/FileUpload'
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files1: [],
      attribute: [
        {
          parame: 'headers',
          text: 'HTTP请求头',
          type: 'Object',
          default: '',
          value: ''
        },
        {
          parame: 'fileAccept',
          text: '文件格式限制，判断文件名后缀，逗号分隔',
          type: 'String',
          default: '.zip,.rar,.xls,.xlsx,.txt',
          value: ''
        },
        {
          parame: 'validateEvent',
          text: '是否触发表单验证',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        },
        {
          parame: 'maxfileSize',
          text: '文件大小',
          type: 'Number',
          default: 'null',
          value: ''
        },
        {
          parame: 'action',
          text: '文件上传地址',
          type: 'String',
          default: '/api/upload/file',
          value: ''
        },
        {
          parame: '其他porps',
          text:
            '其他porps继承于ElUpload参照于<a target="_blank" href="http://element.eleme.io/#/zh-CN/component/upload">element文档</a>',
          type: '',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '文件上传' }])
  }
}
</script>
