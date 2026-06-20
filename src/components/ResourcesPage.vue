<template>
  <div class="resources-page">
    <header id="header">
      <nav class="main-nav">
        <div class="logo">算法可视化平台</div>
        <ul class="nav-links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/resources" class="active">学习资源</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="resources-header">
        <h1>学习资源</h1>
        <p>精选算法学习资料、推荐书籍、优质网站与视频课程，助你高效掌握算法知识。</p>
      </section>
      <section class="resources-list">
        <h2>推荐书籍</h2>
        <ul>
          <li><i class="fas fa-book"></i> 《算法导论》 - Cormen 等</li>
          <li><i class="fas fa-book"></i> 《数据结构与算法分析》 - Weiss</li>
          <li><i class="fas fa-book"></i> 《编程之美》 - Microsoft</li>
        </ul>
        <h2>优质网站</h2>
        <ul>
          <li><i class="fas fa-globe"></i> <a href="https://leetcode.cn/" target="_blank">LeetCode</a></li>
          <li><i class="fas fa-globe"></i> <a href="https://www.geeksforgeeks.org/" target="_blank">GeeksforGeeks</a></li>
          <li><i class="fas fa-globe"></i> <a href="https://oi-wiki.org/" target="_blank">OI Wiki</a></li>
        </ul>
        <h2>视频课程</h2>
        <ul>
          <li><i class="fas fa-video"></i> <a href="https://www.bilibili.com/video/BV1bJ411n7xZ"
              target="_blank">B站：算法基础课</a></li>
          <li><i class="fas fa-video"></i> <a href="https://www.coursera.org/learn/algorithms-part1"
              target="_blank">Coursera：Algorithms</a></li>
        </ul>
      </section>
    </main>
    <footer id="footer">
      <div class="footer-content">
        <div class="footer-logo">算法可视化平台</div>
        <div class="footer-links">
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/resources" class="active">学习资源</router-link>
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
  name: 'ResourcesPage'
}
</script>

<style scoped>
.resources-page {
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

.resources-header {
  text-align: center;
  margin-bottom: 32px;
}

.resources-header h1 {
  color: #16202b;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.resources-header p {
  color: #6c757d;
  font-size: 1.2rem;
}

.resources-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(45, 140, 240, 0.08);
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.resources-list h2 {
  color: #1976d2;
  margin-bottom: 16px;
  font-size: 1.4rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 8px;
}

.resources-list ul {
  list-style: none;
  margin-bottom: 24px;
}

.resources-list ul:last-child {
  margin-bottom: 0;
}

.resources-list li {
  padding: 12px 0;
  border-bottom: 1px solid #f8f9fa;
  font-size: 1.1rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 12px;
}

.resources-list li:last-child {
  border-bottom: none;
}

.resources-list li i {
  color: #1976d2;
  font-size: 1.2rem;
  width: 24px;
}

.resources-list li a {
  color: #1976d2;
  text-decoration: none;
}

.resources-list li a:hover {
  text-decoration: underline;
}

#footer {
  background: linear-gradient(to right, #1f2d3d, #2c3e50);
  color: #ffffff;
  padding: 3.5rem 2rem;
  margin-top: 3rem;
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
  .resources-header h1 {
    font-size: 2rem;
  }
  .resources-header p {
    font-size: 1.1rem;
  }
}
</style>
