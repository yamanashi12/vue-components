<template>
  <ContentBox label="分页">
    <div class="demo-box">
      <pagination ref="pagination1" :page-size="query.pageSize" :total="query.total" :current-page.sync="query.pageIndex" :query.sync="query" @fetch="getList" />
    </div>
    <div class="demo-box">
      <h4>history: false 分页操作不变更url</h4>
      <pagination ref="pagination2" :history="false" :page-size="query.pageSize" :total="query.total" :current-page.sync="query.pageIndex" :query.sync="query" @fetch="getList" />
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
  components: {},
  data() {
    return {
      search: {},
      query: {
        pageIndex: 1,
        pageSize: 10,
        total: 20
      }, // 分页
      attribute: [
        {
          parame: 'query',
          text: '列表接口的搜索参数',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'history',
          text: '历史记录，更改url',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        },
        {
          parame: '其他porps',
          text:
            '其他porps继承于ElPagination参照于<a target="_blank" href="http://element.eleme.io/#/zh-CN/component/pagination">element文档</a>',
          type: '',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '分页' }])
  },
  methods: {
    getList(query) {
      console.log('请求列表数据', query)
    }
  }
}
</script>
