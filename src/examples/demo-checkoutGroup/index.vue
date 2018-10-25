<template>
  <ContentBox label="图片上传">
    <h3>CheckJump</h3>
    <div class="demo-box">
      <ElForm :model="form1" label-width="130px" ref="form1">
        <ElFormItem label="卖家版跳转：" prop="testVal" :rules="[{ required: true, message: '1跳转地址不能为空', trigger: 'manual'}]">
          <CheckoutGroup v-model="form1.testVal" :type.sync="form1.testType" :options="options"/>
          <p class="sub">rules里面trigger建议使用manual，提交触发校验</p>
        </ElFormItem>
        <el-button type="primary" @click="$refs.form1.validate()">确 定</el-button>
      </ElForm>
    </div>
    <h3>有初始值</h3>
    <div class="demo-box">
      <ElForm :model="form2" label-width="130px" ref="form2">
        <ElFormItem label="卖家版跳转：" prop="testVal" :rules="[{ required: true, message: '2跳转地址不能为空', trigger: 'manual'}]">
          <CheckoutGroup v-model="form2.testVal" :type.sync="form2.testType" :options="options" />
        </ElFormItem>
        <el-button type="primary" @click="$refs.form2.validate()">确 定</el-button>
      </ElForm>
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
    <h2>options attribute</h2>
    <ElTable border :data="optionsAttribute">
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
import * as api from './index.service.js'
import CheckoutGroup from '@/components/CheckoutGroup'
export default {
  components: {
    CheckoutGroup
  },
  data() {
    return {
      form1: {},
      form2: {
        testVal: '111',
        testType: 1
      },
      options: [
        {
          label: '商品库',
          value: 0,
          api: api.getCheckJump,
          typeName: 'name',
          valueName: 'value'
        },
        {
          label: '电话',
          value: 1,
          pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
          tips: '11位的手机号码'
        }
      ],
      attribute: [
        {
          parame: 'type',
          text: '类型值',
          type: 'Number',
          default: 0,
          value: ''
        },
        {
          parame: 'value',
          text: '校验值（v-model含括了）',
          type: 'Number',
          default: 0,
          value: ''
        },
        {
          parame: 'disabled',
          text: '禁用',
          type: 'Boolean',
          default: 'false',
          value: 'true/false'
        },
        {
          parame: 'tips',
          text: '提示信息',
          type: 'String',
          default: '',
          value: ''
        }
      ],
      optionsAttribute: [
        {
          parame: 'label',
          text: '类别选项名称',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'value',
          text: '类别选项值',
          type: 'Number',
          default: '0',
          value: ''
        },
        {
          parame: 'api',
          text: '校验接口',
          type: 'function',
          default: '',
          value: ''
        },
        {
          parame: 'typeName',
          text: '接口type的key',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'valueName',
          text: '接口value的key',
          type: 'String',
          default: '',
          value: ''
        },
        {
          parame: 'pattern',
          text: '正则校验规则',
          type: 'regex',
          default: '',
          value: ''
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: '/', title: 'CheckoutGroup' }])
  },
  methods: {}
}
</script>
