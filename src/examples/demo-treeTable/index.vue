<template>
  <ContentBox label="文件上传">
    <div class="demo-box">
      <TreeTable 
        :items='data' 
        :columns='columns'
        @on-selection-change='selectionClick'>
        <template slot-scope="scope" slot="action">
          <el-button @click="rowClick(scope)">操作</el-button>
        </template>
      </TreeTable>
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
    <h2>TreeTable Events</h2>
    <ElTable border :data="TreeTableEvents">
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
    <h2>Items Attribute</h2>
    <ElTable border :data="ItemsAttribute">
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
    <h2>Columns Attribute</h2>
    <ElTable border :data="ColumnsAttribute">
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
import TreeTable from '@/components/TreeTable'
import TreeTableJson from './treeTable.json.js'
export default {
  components: {
    TreeTable
  },
  data() {
    return {
      ...TreeTableJson,
      attribute: [
        {
          parame: 'items',
          text: '表格数据',
          type: 'Array',
          default: '',
          value: ''
        },
        {
          parame: 'columns',
          text: '表头标题',
          type: 'Array',
          default: '',
          value: ''
        },
        {
          parame: 'valName',
          text: '多选表格的key值',
          type: 'Array',
          default: '',
          value: ''
        }
      ],
      TreeTableEvents: [
        {
          parame: 'on-selection-change',
          text: '每次点击checkbox的事件，返回所选value',
          type: 'Array',
          default: '',
          value: ''
        }
      ],
      ItemsAttribute: [
        {
          parame: 'on-selection-change',
          text: '每次点击checkbox的事件，返回所选value',
          type: 'Array',
          default: '',
          value: ''
        }
      ],
      ColumnsAttribute: [
        {
          parame: 'title',
          text: '标题',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'key',
          text: '对应列内容的字段名',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'type',
          text: '类型',
          type: 'String',
          default: '',
          value:
            '操作：action，排序：selection，收展箭头：flod（规则，优先flod，否则默认第一个，如果第一个是selection则第二个，）'
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([
      { path: '/', title: '树形表格' },
      { path: '/', title: '树形表格' },
      { path: '/', title: '树形表格' },
      { path: '/', title: '树形表格' },
      { path: '/', title: '树形表格' }
    ])
  },
  methods: {
    rowClick(data) {
      console.log('当前行数据:', data.row)
      console.log('点击行号:' + data.index)
    },
    selectionClick(arr) {
      console.log('选中数据id数组:' + arr)
    }
  }
}
</script>

<style>
</style>