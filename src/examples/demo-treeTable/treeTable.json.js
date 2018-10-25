export default {
  columns: [
    {
      type: 'selection',
      width: 50,
      align: 'center'
    },
    {
      title: '编码',
      key: 'code'
    },
    {
      title: '名称',
      key: 'name',
      type: 'flod'
    },
    {
      title: '状态',
      key: 'status'
    },
    {
      title: '备注',
      key: 'remark'
    },
    {
      title: '操作',
      type: 'action'
    }
  ],
  data: [
    {
      id: 'a1',
      code: '0001',
      name: '测试数据1',
      status: '启用',
      remark: '测试数据测试数据'
    },
    {
      id: 'a2',
      code: '0002',
      name: '测试数据2',
      status: '启用',
      remark: '测试数据测试数据',
      children: [
        {
          id: 'a01',
          code: '00001',
          name: '测试数据01',
          status: '启用',
          remark: '测试数据测试数据',
          children: [
            {
              id: 'a001',
              code: '00001',
              name: '测试数据01',
              status: '启用',
              remark: '测试数据测试数据'
            },
            {
              id: 'a002',
              code: '00002',
              name: '测试数据02',
              status: '启用',
              remark: '测试数据测试数据'
            }
          ]
        },
        {
          id: 'a02',
          code: '00002',
          name: '测试数据02',
          status: '启用',
          remark: '测试数据测试数据'
        }
      ]
    },
    {
      id: 'a3',
      code: '0003',
      name: '测试数据3',
      status: '启用',
      remark: '测试数据测试数据'
    },
    {
      id: 'a4',
      code: '0004',
      name: '测试数据4',
      status: '启用',
      remark: '测试数据测试数据'
    }
  ]
}
