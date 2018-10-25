<template>
  <ContentBox label="缺省页">
    <div class="demo-box">
      <placeholder text="暂时没有数据" />
    </div>
     <div class="demo-box">
       <h4>变更图片</h4>
      <placeholder text="暂时没有数据" src="http://img3.imgtn.bdimg.com/it/u=526868224,3158150009&fm=26&gp=0.jpg" />
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
import Placeholder from '@/components/Placeholder'
export default {
  components: {
    Placeholder
  },
  data() {
    return {
      attribute: [
        {
          parame: 'src',
          text: '图片地址',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'text',
          text: '文本',
          type: 'String',
          default: '没有相关数据',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '缺省页' }])
  },
  methods: {}
}
</script>
