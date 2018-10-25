<template>
  <ContentBox label="图片上传">
    <h3>input</h3>
    <div class="demo-box">
      <ElInput v-model="text" numberWord :maxlength="10"/>
    </div>
    <h3>textarea</h3>
    <div class="demo-box">
      <ElInput type="textarea" v-model="textarea" numberWord :maxlength="100"/>
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
export default {
  data() {
    return {
      text: undefined,
      textarea: '',
      attribute: [
        {
          parame: 'numberWord',
          text: '判断显示字数',
          type: 'Boolean',
          default: 'false',
          value: 'true/false'
        },
        {
          parame: 'maxlength',
          text: '最大字符数',
          type: 'Number',
          default: '',
          value: ''
        },
        {
          parame: '其他porps',
          text:
            '其他porps继承于ElInput参照于<a target="_blank" href="http://element-cn.eleme.io/#/zh-CN/component/input">element文档</a>',
          type: '',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: 'input带字符数' }])
  }
}
</script>
