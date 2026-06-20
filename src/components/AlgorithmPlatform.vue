<template>
  <div class="algorithm-platform">
    <header class="header">
      <nav class="main-nav">
        <div class="logo">算法可视化平台</div>
        <ul class="nav-links">
          <li><router-link to="/" class="active">首页</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/resources">学习资源</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <h1>通过可视化学习算法</h1>
          <p>直观地观察算法执行过程，加深理解并提高学习效率</p>
          <button class="btn btn-primary" @click="scrollToCategories">
            开始探索
          </button>
        </div>
      </section>

      <section id="algorithm-categories" class="algorithm-categories">
        <h2 class="section-title">算法分类</h2>
        <div class="category-cards">
          <div
            v-for="category in categories"
            :key="category.id"
            class="card"
            :data-category="category.id"
          >
            <div class="card-icon">
              <i :class="category.icon"></i>
            </div>
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>
            <a href="#" class="card-link" @click.prevent="navigateToCategory(category)">
              查看详情 <i class="fas fa-arrow-right"></i>
            </a>
            <div class="card-preview">
              <img
                :src="category.previewImage"
                :alt="category.title + '预览'"
                class="preview-image"
              />
            </div>
          </div>
        </div>
        <div class="category-actions">
          <button class="btn btn-secondary" @click="showMoreAlgorithms">
            更多算法 <i class="fas fa-chevron-down"></i>
          </button>
        </div>
      </section>

      <section class="features">
        <h2 class="section-title">平台特点</h2>
        <div class="feature-container">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="feature"
          >
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">算法可视化平台</div>
        <div class="footer-links">
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/resources">学习资源</router-link>
        </div>
        <div class="footer-copyright">
          &copy; 2025 算法可视化平台 - 所有权利保留
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AlgorithmPlatform',
  data() {
    return {
      categories: [
        {
          id: 'sorting',
          icon: 'fas fa-sort-amount-down',
          title: '排序算法',
          description: '学习和可视化不同的排序算法，如冒泡排序、快速排序等',
          previewImage: 'src/assets/images/sorting-preview.png'
        },
        {
          id: 'searching',
          icon: 'fas fa-search',
          title: '搜索算法',
          description: '探索线性搜索、二分查找等搜索算法的工作原理',
          previewImage: 'src/assets/images/searching-preview.png'
        },
        {
          id: 'graph',
          icon: 'fas fa-project-diagram',
          title: '图算法',
          description: '理解深度优先搜索、广度优先搜索等图算法的执行过程',
          previewImage: 'src/assets/images/graph-preview.png'
        },
        {
          id: 'dynamic',
          icon: 'fas fa-chess-board',
          title: '动态规划',
          description: '学习动态规划的基本概念与经典问题的求解过程',
          previewImage: 'src/assets/images/dynamic-preview.png'
        }
      ],
      features: [
        {
          id: 'visualization',
          icon: 'fas fa-eye',
          title: '直观可视化',
          description: '通过动画图形直观展示算法执行的每一步'
        },
        {
          id: 'control',
          icon: 'fas fa-sliders-h',
          title: '交互控制',
          description: '调整算法参数，控制执行速度，深入理解算法内部'
        },
        {
          id: 'learning',
          icon: 'fas fa-book-open',
          title: '学习资料',
          description: '提供详细的算法解析和代码注释，辅助学习'
        }
      ]
    }
  },
  methods: {
    scrollToCategories() {
      const element = document.getElementById('algorithm-categories')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    navigateToCategory(category) {
      const routes = {
        sorting: '/sorting',
        searching: '/searching',
        graph: '/graph',
        dynamic: '/dynamic'
      }
      if (routes[category.id]) {
        this.$router.push(routes[category.id])
      }
    },
    showMoreAlgorithms() {
      // 保持当前位置
    }
  }
}
</script>

<style scoped>
/* 样式将与原始CSS保持一致 */
.algorithm-platform {
  font-family: 'Noto Sans SC', 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333333;
  background-color: #f4f6f9;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #007bff;
  transition: all 0.3s ease;
}

/* 头部导航 */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(to right, #1f2d3d, #2c3e50);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links li a {
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-links a.active {
  background-color: rgba(255, 255, 255, 0.25);
}

/* 英雄区域 */
.hero {
  height: 42vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

/* 按钮样式 */
.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

.btn-secondary {
  background-color: #6c757d;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* 算法分类区域 */
.algorithm-categories {
  padding: 4rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  color: #16202b;
  font-weight: 600;
  margin-bottom: 3rem;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.card h3 {
  font-size: 1.4rem;
  color: #16202b;
  margin-bottom: 0.8rem;
}

.card p {
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.card-link {
  display: inline-block;
  color: #007bff;
  font-weight: 600;
  font-size: 0.95rem;
}

.card-link:hover {
  color: #0056b3;
}

.card-link i {
  transition: transform 0.3s ease;
}

.card-link:hover i {
  transform: translateX(4px);
}

.card-preview {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: auto;
  display: block;
}

.category-actions {
  text-align: center;
}

/* 平台特点区域 */
.features {
  padding: 4rem 5%;
  background-color: #ffffff;
}

.feature-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  color: #16202b;
  margin-bottom: 0.8rem;
}

.feature p {
  color: #6c757d;
  line-height: 1.6;
}

/* 页脚 */
.footer {
  background: linear-gradient(to right, #1f2d3d, #16202b);
  color: #ffffff;
  padding: 2rem 5%;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links a {
  color: #abb2bf;
  margin: 0 1rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-copyright {
  color: #abb2bf;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .main-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .category-cards {
    grid-template-columns: 1fr;
  }
}
</style>
