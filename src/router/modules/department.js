import layout from '@/layout'
export default {
  // 路由信息
  path: '/department', // 一级路由
  component: layout,
  children: [
    {
      path: '', // 二级路由地址为空时，表示 /department  即一级路由 + 二级路由
      name: 'department', // 可以用来路由跳转 或者 标记路由（做权限用）
      component: () => import('@/views/department'),
      meta:{ //路由元信息 存储数据的
        title: '组织', //标题
        icon: 'tree' //图标
      }
    }
  ]
}
