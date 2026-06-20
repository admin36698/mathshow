<template>
  <div class="about-page">
    <header id="header">
      <nav class="main-nav">
        <div class="logo">算法可视化平台</div>
        <ul class="nav-links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/sorting">算法列表</router-link></li>
          <li><router-link to="/about" class="active">关于我们</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="about-header">
        <h2>我们的使命与愿景</h2>
        <p>算法可视化平台致力于通过直观的可视化手段，帮助学习者、开发者和研究人员更好地理解各种算法的原理和运行机制。</p>
      </section>

      <section class="features-grid">
        <div class="feature-card">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
               alt="算法可视化">
          <div class="feature-content">
            <h3>直观的可视化</h3>
            <p>我们提供丰富的交互式可视化工具，让抽象的算法概念变得具体可见。通过动态演示，您可以清晰地看到算法每一步的执行过程。</p>
          </div>
        </div>
        <div class="feature-card">
          <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
               alt="学习资源">
          <div class="feature-content">
            <h3>全面的学习资源</h3>
            <p>平台包含详细的算法文档、复杂度分析和实际应用案例。无论您是初学者还是资深开发者，都能找到适合的学习材料。</p>
          </div>
        </div>
        <div class="feature-card">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
               alt="社区互动">
          <div class="feature-content">
            <h3>活跃的社区</h3>
            <p>加入我们的开发者社区，与其他算法爱好者交流心得，分享见解，共同解决编程难题。</p>
          </div>
        </div>
      </section>

      <section class="about-contact">
        <h2>联系我们</h2>
        <p>如有建议、合作或技术问题，欢迎通过 <a href="mailto:contact@algovis.com">contact@algovis.com</a> 与我们联系。</p>
      </section>
    </main>

    <footer id="footer">
      <div class="footer-content">
        <div class="footer-logo">算法可视化平台</div>
        <div class="footer-links">
          <router-link to="/">首页</router-link>
          <router-link to="/about" class="active">关于我们</router-link>
          <router-link to="/resources">联系我们</router-link>
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
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  font-family: 'Noto Sans SC', 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333333;
  background-color: #f4f6f9;
  min-height: 100vh;
}

#header {
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

main {
  padding: 2rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 32px;
}

.about-header h2 {
  color: #16202b;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-bottom: 40px;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(45, 140, 240, 0.08);
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 18px;
  transition: box-shadow 0.2s;
}

.feature-card:hover {
  box-shadow: 0 4px 24px rgba(45, 140, 240, 0.18);
}

.feature-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.feature-content h3 {
  color: #1976d2;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.feature-content p {
  color: #555;
  font-size: 1rem;
  text-align: center;
}

.about-contact {
  text-align: center;
  margin-bottom: 32px;
}

.about-contact h2 {
  color: #16202b;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.about-contact p {
  color: #6c757d;
  font-size: 1rem;
}

.about-contact a {
  color: #1976d2;
  text-decoration: underline;
}

#footer {
  background: linear-gradient(to right, #1f2d3d, #2c3e50);
  color: #ffffff;
  padding: 3.5rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.footer-links {
  margin-bottom: 2rem;
}

.footer-links a {
  color: #ffffff;
  margin: 0 1.2rem;
  padding: 0.5rem 0;
  font-weight: 500;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-links a.active {
  opacity: 1;
}

.footer-copyright {
  opacity: 0.7;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .main-nav {
    padding: 1rem;
    flex-direction: column;
  }
  .nav-links {
    margin-top: 1.2rem;
    gap: 1rem;
  }
  .features-grid {
    flex-direction: column;
    align-items: center;
  }
  .feature-card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
