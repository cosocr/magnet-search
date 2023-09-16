import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/index/index.vue'),
    children: [
      {
        path: '/',
        meta: {
          name: '',
          keepAlive: true
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/video',
        meta: {
          name: '视频',
          keepAlive: 'show'
        },
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/config',
        meta: {
          name: '配置',
          keepAlive: true
        },
        component: () => import('@/views/config/index.vue')
      },
      {
        path: '/setting',
        meta: {
          name: '设置',
          keepAlive: true
        },
        component: () => import('@/views/setting/index.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from, next) => {
  if (to.meta.name) {
    document.title = `MagnetSearch - ${String(to.meta.name)}`
  } else {
    document.title = 'MagnetSearch'
  }
  next()
})

export default router
