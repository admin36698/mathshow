import { createRouter, createWebHistory } from 'vue-router'
import AlgorithmPlatform from '../components/AlgorithmPlatform.vue'
import SortingVisualization from '../components/SortingVisualization.vue'
import SearchingVisualization from '../components/SearchingVisualization.vue'
import GraphVisualization from '../components/GraphVisualization.vue'
import DynamicProgramming from '../components/DynamicProgramming.vue'
import AboutPage from '../components/AboutPage.vue'
import ResourcesPage from '../components/ResourcesPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AlgorithmPlatform
  },
  {
    path: '/sorting',
    name: 'Sorting',
    component: SortingVisualization
  },
  {
    path: '/searching',
    name: 'Searching',
    component: SearchingVisualization
  },
  {
    path: '/graph',
    name: 'Graph',
    component: GraphVisualization
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: DynamicProgramming
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/resources',
    name: 'Resources',
    component: ResourcesPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
