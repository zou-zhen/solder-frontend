import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/login',
        meta: {
          title: '登录'
        },
        component: () => import('@renderer/views/login/index.vue')
      }
    ]
  },
  {
    path: '/home',
    name: '主页',
    meta: {
      title: '主页'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/home',
        meta: {
          title: '主页'
        },
        component: () => import('@renderer/views/home/index.vue')
      }
    ]
  },
  {
    path: '/functionPage',
    name: '设置页',
    meta: {
      title: '设置页'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/functionPage',
        meta: {
          title: '设置页'
        },
        component: () => import('@renderer/views/functionPage/index.vue')
      }
    ]
  },
  {
    path: '/outbound',
    name: '出库',
    meta: {
      title: '出库'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/outbound',
        meta: {
          title: '出库'
        },
        component: () => import('@renderer/views/outbound/index.vue')
      }
    ]
  },
  {
    path: '/reservation',
    name: '预约',
    meta: {
      title: '预约'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/reservation',
        meta: {
          title: '预约'
        },
        component: () => import('@renderer/views/reservation/index.vue')
      }
    ]
  },
  {
    path: '/inventoryQuery',
    name: '查询',
    meta: {
      title: '查询'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/inventoryQuery',
        meta: {
          title: '查询'
        },
        component: () => import('@renderer/views/inventoryQuery/index.vue')
      }
    ]
  },
  {
    path: '/modelManagement',
    name: '型号管理',
    meta: {
      title: '型号管理'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/modelManagement',
        meta: {
          title: '型号管理'
        },
        component: () => import('@renderer/views/modelManagement/index.vue')
      }
    ]
  },
  {
    path: '/alert',
    name: '报警记录',
    meta: {
      title: '报警记录'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/alert',
        meta: {
          title: '报警记录'
        },
        component: () => import('@renderer/views/alert/index.vue')
      }
    ]
  },
  {
    path: '/dataLog',
    name: '数据记录',
    meta: {
      title: '数据记录'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/dataLog',
        meta: {
          title: '数据记录'
        },
        component: () => import('@renderer/views/dataLog/index.vue')
      }
    ]
  },
  {
    path: '/user',
    name: '用户管理',
    meta: {
      title: '用户管理'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@renderer/views/user/index.vue')
      }
    ]
  },
  {
    path: '/system',
    name: '系统设置',
    meta: {
      title: '系统设置'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/system',
        meta: {
          title: '系统设置'
        },
        component: () => import('@renderer/views/system/index.vue')
      }
    ]
  },
  {
    path: '/movement',
    name: '运动系统',
    meta: {
      title: '运动系统'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/movement',
        meta: {
          title: '运动系统'
        },
        component: () => import('@renderer/views/movement/index.vue')
      }
    ]
  },
  {
    path: '/manual',
    name: '示教',
    meta: {
      title: '示教'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/manual',
        meta: {
          title: '示教'
        },
        component: () => import('@renderer/views/manual/index.vue')
      }
    ]
  },
  {
    path: '/station',
    name: '工位设置',
    meta: {
      title: '工位设置'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/station',
        meta: {
          title: '工位设置'
        },
        component: () => import('@renderer/views/station/index.vue')
      }
    ]
  },
  {
    path: '/secondaryPage',
    name: '其它设置',
    meta: {
      title: '其它设置'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/secondaryPage',
        meta: {
          title: '其它设置'
        },
        component: () => import('@renderer/views/secondaryPage/index.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: '设置',
    meta: {
      title: '设置'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/setting',
        meta: {
          title: '设置'
        },
        component: () => import('@renderer/views/setting/index.vue')
      }
    ]
  },
  {
    path: '/recycle',
    name: '回收',
    meta: {
      title: '回收'
    },
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/recycle',
        meta: {
          title: '回收'
        },
        component: () => import('@renderer/views/recycle/index.vue')
      }
    ]
  },
  {
    path: '/mock',
    name: '模拟',
    meta: {
      title: '模拟'
    },
    // component: () => import('@renderer/views/mockDemo/index.vue'),
    component: () => import('@renderer/layouts/index.vue'),
    children: [
      {
        path: '/mock',
        meta: {
          title: '首页'
        },
        component: () => import('@renderer/views/mockDemo/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 挂载路由导航守卫：to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, _from, next) => {
  // 修改页面 title
  if (to.meta.title) {
    document.title = '智能锡膏柜管理系统 - ' + to.meta.title
  }
  // 放行登录页面
  if (to.path === '/home') {
    return next()
  } else {
    // 获取token
    const token = localStorage.getItem('access_token')

    if (!token) {
      return next('/home')
    } else {
      console.log('kkk')

      next()
    }
  }
  return next()
})

// 导出路由
export default router
