import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import CreateTrip from './components/CreateTrip.vue'
import MyTrips from './components/MyTrips.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/create', name: 'createTrip', component: CreateTrip },
  { path: '/my-trips', name: 'myTrips', component: MyTrips }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
