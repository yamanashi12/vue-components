<template>
  <ContentBox label="cell布局">
    <div class="demo-box">
      <h4>多行文本居中</h4>
      <Cellbox middle>
        <CellItem>13123123</CellItem>
        <CellItem>
          <p>1232</p>
          <p>1232</p>
        </CellItem>
      </Cellbox>
    </div>
    <div class="demo-box">
      <h4>gutter 每个CellItem的间距</h4>
      <Cellbox middle :gutter="30">
        <CellItem>item</CellItem>
        <CellItem>item</CellItem>
        <CellItem>item</CellItem>
        <CellItem>item</CellItem>
      </Cellbox>
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
      attribute: [
        {
          parame: 'gutter',
          text: 'CellItem横向间距',
          type: 'Number',
          default: '0',
          value: ''
        },
        {
          parame: 'middle',
          text: '是否垂直居中',
          type: 'Boolean',
          default: 'false',
          value: 'true/false'
        },
        {
          parame: 'tag',
          text: 'CellBox的标签',
          type: 'String，Object',
          default: 'div',
          value: 'div,span,p,ul等等'
        },
        {
          parame: 'itemTag',
          text: 'CellItem的标签',
          type: 'String，Object',
          default: 'div',
          value: 'div,span,p,ul等等'
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
