export default [
  {
    path: '/imgUpload',
    name: 'imgUpload',
    title: '图片上传',
    component: () => import(/* webpackChunkName: "document-imgUpload" */ '@/examples/demo-imgUpload')
  },
  {
    path: '/fileUpload',
    name: 'fileUpload',
    title: '图片上传',
    component: () => import(/* webpackChunkName: "document-fileUpload" */ '@/examples/demo-fileUpload')
  },
  {
    path: '/grounp',
    name: 'grounp',
    title: '组',
    component: () => import(/* webpackChunkName: "document-grounp" */ '@/examples/demo-grounp')
  },
  {
    path: '/inputGroup',
    name: 'inputGroup',
    title: '输入框组',
    component: () => import(/* webpackChunkName: "document-inputGroup" */ '@/examples/demo-inputGroup')
  },
  {
    path: '/pagination',
    name: 'pagination',
    title: '分页',
    component: () => import(/* webpackChunkName: "document-pagination" */ '@/examples/demo-pagination')
  },
  {
    path: '/previewBox',
    name: 'previewBox',
    title: '灯箱查看大图',
    component: () => import(/* webpackChunkName: "document-previewBox" */ '@/examples/demo-previewBox')
  },
  {
    path: '/searchMore',
    name: 'searchMore',
    title: '查看更多',
    component: () => import(/* webpackChunkName: "document-searchMore" */ '@/examples/demo-searchMore')
  },
  {
    path: '/placeholder',
    name: 'placeholder',
    title: '缺省页',
    component: () => import(/* webpackChunkName: "document-placeholder" */ '@/examples/demo-placeholder')
  },
  {
    path: '/cellbox',
    name: 'cellbox',
    title: '布局',
    component: () => import(/* webpackChunkName: "document-cellbox" */ '@/examples/demo-cellbox')
  },
  {
    path: '/input',
    name: 'input',
    title: 'input',
    component: () => import(/* webpackChunkName: "document-input" */ '@/examples/demo-input')
  },
  {
    path: '/checkoutGroup',
    name: 'checkoutGroup',
    title: 'checkoutGroup',
    component: () => import(/* webpackChunkName: "document-checkoutGroup" */ '@/examples/demo-checkoutGroup/index')
  },
  {
    path: '/treeTable',
    name: 'treeTable',
    title: 'treeTable',
    component: () => import(/* webpackChunkName: "document-treeTable" */ '@/examples/demo-treeTable/index')
  },
  {
    path: '/multipleCascader',
    name: 'multipleCascader',
    title: 'multipleCascader',
    component: () =>
        import(/* webpackChunkName: "document-multipleCascader" */ '@/examples/demo-multipleCascader/index')
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    title: 'datePicker',
    component: () => import(/* webpackChunkName: "document-datePicker" */ '@/examples/demo-datePicker/index')
  },
  {
    path: '/tinymce/demo',
    name: 'tinymceDemo',
    title: '富文本tinymce',
    component: () => import(/* webpackChunkName: "document-tinymce" */ '@/examples/demo-Tinymce/demo')
  },
  {
    path: '/Editor',
    name: 'Editor',
    title: '富文本',
    component: () => import(/* webpackChunkName: "document-Editor" */ '@/examples/demo-Editor')
  }
]
    