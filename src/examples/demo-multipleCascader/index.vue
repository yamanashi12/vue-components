<template>
  <ContentBox label="cell布局">
    <div class="demo-box">
      <h3>v-model绑定返回数组内是对象 type="object"</h3>
      <MultipleCascader 
        :options="options"
        filterable
        type="object"
        v-model="value1"/>
        <p>值：{{value1}}</p>
    </div>
    <div class="demo-box">
      <h3>v-model绑定返回数组内是对象 type="value"</h3>
      <MultipleCascader 
        :options="options"
        filterable
        type="value"
        v-model="value2"/>
        <p>值：{{value2}}</p>
    </div>
    <div class="demo-box">
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
import MultipleCascader from '@/components/MultipleCascader'
import json from './multipleCascader.json.js'
export default {
  components: { MultipleCascader },
  data() {
    return {
      ...json,
      value1: [],
      value2: [],
      attribute: [
        {
          parame: 'type',
          text: '返回的数据类型',
          type: 'String',
          default: 'value',
          value: 'value/object'
        },
        {
          parame: 'tagType',
          text: 'element Tag组件的type',
          type: 'String',
          default: 'info',
          value: ''
        },
        {
          parame: '其他porps',
          text:
            '其他porps继承于ElCascader 参照于<a target="_blank" href="http://element-cn.eleme.io/#/zh-CN/component/cascader">element文档</a>',
          type: '',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '多选级联选择器' }])
  },
  methods: {
    getList(query) {
      console.log('请求列表数据', query)
    }
  }
}
</script>
