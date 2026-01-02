import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import ViewBlog from '../views/ViewBlog.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: ListView
  },
  {
    path: '/blog/:id',
    name: 'ViewBlog',
    component: ViewBlog
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router