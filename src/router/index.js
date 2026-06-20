import { createRouter, createWebHistory } from 'vue-router'
import AlgorithmPlatform from '../components/AlgorithmPlatform.vue'
import SortingVisualization from '../components/SortingVisualization.vue'
import SearchingVisualization from '../components/SearchingVisualization.vue'
import GraphVisualization from '../components/GraphVisualization.vue'
import DynamicProgramming from '../components/DynamicProgramming.vue'

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
    component: {
      template: `
        <div class="about-page">
          <header class="header">
            <nav class="main-nav">
              <div class="logo">算法可视化平台</div>
              <ul class="nav-links">
                <li><a href="/">首页</a></li>
                <li><a href="/about" class="active">关于我们</a></li>
                <li><a href="/resources">学习资源</a></li>
              </ul>
            </nav>
          </header>
          <main class="about-content">
            <h1>关于我们</h1>
            <p>这是一个帮助学习者通过可视化方式理解算法的教育平台。</p>
          </main>
        </div>
      `
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: {
      template: `
        <div class="resources-page">
          <header class="header">
            <nav class="main-nav">
              <div class="logo">算法可视化平台</div>
              <ul class="nav-links">
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于我们</a></li>
                <li><a href="/resources" class="active">学习资源</a></li>
              </ul>
            </nav>
          </header>
          <main class="resources-content">
            <h1>学习资源</h1>
            <p>这里提供了丰富的算法学习资源。</p>
          </main>
        </div>
      `
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
