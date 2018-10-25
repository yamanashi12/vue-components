<template>
  <ContentBox label="图片上传">
    <h3>单图上传</h3>
    <div class="demo-box">
      <ImgUpload :isCrop="false" style="height: 200px; width: 200px;" v-model="imgSrc" :data="{maxHeight: 500, maxWidth: 1000}"/>
    </div>
    <h3>多图上传</h3>
    <div class="demo-box">
      <ImgGroupUpload v-model="imgGroup" :data="{maxHeight: 500, maxWidth: 1000}" :width="50" :height="50"/>
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
    <h2>多图上传 ImgGroupUpload</h2>
    <ElTable border :data="attribute2">
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
import ImgUpload from '@/components/ImgUpload'
import ImgGroupUpload from '@/components/ImgGroupUpload'
export default {
  components: {
    ImgUpload,
    ImgGroupUpload
  },
  data() {
    return {
      imgSrc: '',
      imgGroup: [],
      attribute: [
        {
          parame: 'headers',
          text: 'HTTP请求头',
          type: 'Object',
          default: '',
          value: ''
        },
        {
          parame: 'value',
          text: '图片地址，使用v-model包含value',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'accept',
          text: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）',
          type: 'String',
          default: 'image/jpeg,image/png',
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
          parame: 'size',
          text: '文件大小',
          type: 'Number',
          default: '1024 * 1024 * 5',
          value: ''
        },
        {
          parame: 'action',
          text: '文件上传地址',
          type: 'String',
          default: '/api/cdnadmin/admin/upload/uploadPic_json.json',
          value: ''
        },
        {
          parame: 'formatList',
          text: '上传文件格式',
          type: 'Array',
          default: '[.png, .jpeg, .jpg]',
          value: ''
        },
        {
          parame: 'data',
          text:
            '上传图片文件包含的参数，也包含了限制图片大小判断，固定宽（width,height）,最大宽高（maxWidth,maxHeight）',
          type: 'Object',
          default: '',
          value: 'height,width,maxHeight,maxWidth'
        },
        {
          parame: 'name',
          text: '上传参数名',
          type: 'String',
          default: 'data',
          value: ''
        },
        {
          parame: 'style',
          text: '控制上传图片框的样式',
          type: 'css',
          default: '',
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
      ],
      attribute2: [
        {
          parame: 'limit',
          text: '允许最大上传文件个数',
          type: 'Number',
          default: '0',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '图片上传' }])
  }
}
</script>
