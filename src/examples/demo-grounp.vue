<template>
  <ContentBox label="组操作">
    <div class="demo-box">
      <Group
        :value="myValue"
        :max-item="5"
        @add="handleAdd"
        @remove="handleRemove">
        <template slot-scope="scope">
          <p>当前是第{{scope.index}} {{scope.item}}</p>
        </template>
      </Group>
    </div>
    <div class="demo-box">
      <h4>simpleLayout false</h4>
      <Group
        :value="myValue"
        :max-item="5"
        :inline="false"
        :simpleLayout='false'
        @add="handleAdd"
        @remove="handleRemove">
        <template slot-scope="scope">
          <p>当前是第{{scope.index}} {{scope.item}}</p>
        </template>
      </Group>
    </div>
    <div class="demo-box">
      <h4>inline false</h4>
      <Group
        :value="myValue"
        :max-item="5"
        :inline="false"
        @add="handleAdd"
        @remove="handleRemove">
        <template slot-scope="scope">
          <p>当前是第{{scope.index}} {{scope.item}}</p>
        </template>
      </Group>
    </div>
    <h2>Attribute</h2>
    <ElTable border :data="attribute">
      <ElTableColumn prop="parame" label="参数"/>
      <ElTableColumn prop="text" label="说明"/>
      <ElTableColumn prop="type" label="参数类型"/>
      <ElTableColumn prop="value" label="可选值"/>
      <ElTableColumn prop="default" label="默认值"/>
    </ElTable>
    <h2>Events</h2>
    <ElTable border :data="events">
      <ElTableColumn prop="parame" label="参数"/>
      <ElTableColumn prop="text" label="说明"/>
      <ElTableColumn prop="type" label="参数类型"/>
      <ElTableColumn prop="value" label="可选值"/>
      <ElTableColumn prop="default" label="默认值"/>
    </ElTable>
  </ContentBox>
</template>
<script>
import Group from '@/components/Group'
export default {
  components: {
    Group
  },
  watch: {
    value(value) {
      this.myValue = value
    }
  },
  data() {
    let myValue = this.value
    if (!this.value || this.value.length === 0) {
      myValue = ['']
    }
    return {
      myValue,
      attribute: [
        {
          parame: 'maxItem',
          text: '最大项目数',
          type: 'Number',
          default: '100',
          value: ''
        },
        {
          parame: 'buttonDisabled',
          text: '按钮的disabled属性',
          type: 'Boolean',
          default: 'false',
          value: 'true/false'
        },
        {
          parame: 'simpleLayout',
          text: '加减按钮样式',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        },
        {
          parame: 'inline',
          text: '布局样式',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        },
        {
          parame: 'gutter',
          text: 'ElRow的参数',
          type: 'Number',
          default: '20',
          value: ''
        },
        {
          parame: 'span',
          text: 'ElRow的参数',
          type: 'Number',
          default: '24',
          value: ''
        },
        {
          parame: 'disabled',
          text: '',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        },
        {
          parame: 'disabled',
          text: '',
          type: 'Boolean',
          default: 'true',
          value: 'true/false'
        }
      ],
      events: [
        {
          parame: 'add',
          text: '点击加号的事件',
          type: 'Function',
          default: '',
          value: ''
        },
        {
          parame: 'remove',
          text: '点击减号的事件',
          type: 'Function',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: '组操作' }])
  },
  methods: {
    handleAdd(index) {
      this.myValue.push(new Date())
    },
    handleRemove(index) {
      let valueClone = [...this.myValue]
      valueClone.splice(index, 1)
      this.myValue = valueClone
    }
  }
}
</script>
