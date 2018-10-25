<template>
  <ContentBox label="input组">
    <div class="demo-box">
      <h4>inline false</h4>
      <InputGroup v-model="value1"/>
    </div>
    <div class="demo-box">
      <h4>inline true</h4>
      <InputGroup v-model="value2" :inline="true"/>
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
import InputGroup from '@/components/InputGroup'
export default {
  components: {
    InputGroup
  },
  data() {
    return {
      value1: [],
      value2: [],
      attribute: [
        {
          parame: 'inline',
          text: '布局样式',
          type: 'Boolean',
          default: 'false',
          value: 'true/false'
        },
        {
          parame: 'gutter',
          text: 'ElRow的参数',
          type: 'Number',
          default: '0',
          value: ''
        },
        {
          parame: '其他porps',
          text:
            '其他porps继承于ElInput参照于<a target="_blank" href="http://element.eleme.io/#/zh-CN/component/input">element文档</a>',
          type: '',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: 'input组' }])
  },
  methods: {}
}
</script>
