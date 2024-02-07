import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    redirect: '/login'
  },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/operate/Login.vue'),
      children: [
        {
          path:'/loginForm',
          name:'登录',
          component: () => import('@/components/operate/Login_Form')
        },
        {
          path:'/registerForm',
          name:'注册',
          component: () => import('@/components/operate/Register_Form')
        },
        {
          path:'/forgotPassword',
          name:'找回密码',
          component: () => import('@/components/operate/Forgot_Password')
        }
      ]
    }
  ]
})

export default router
