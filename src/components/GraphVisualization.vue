<template>
  <div class="algorithm-platform">
    <header class="header">
      <nav class="main-nav">
        <div class="logo">算法可视化平台</div>
        <ul class="nav-links">
          <li><a href="/">首页</a></li>
          <li><a href="/about">关于我们</a></li>
          <li><a href="/resources">学习资源</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="graph-header">
        <h1>图算法可视化</h1>
        <p>探索图结构与经典图算法，理解深度优先搜索、广度优先搜索、最短路径等核心原理。</p>
      </section>

      <section class="graph-list">
        <h2>可视化算法</h2>
        <ul>
          <li @click="currentView = 'dfs'">
            <i class="fas fa-long-arrow-alt-down"></i>
            <span>深度优先搜索（DFS）</span>
            <button class="btn btn-small" @click.stop="startVisualization('dfs')">开始</button>
          </li>
          <li @click="currentView = 'bfs'">
            <i class="fas fa-expand"></i>
            <span>广度优先搜索（BFS）</span>
            <button class="btn btn-small" @click.stop="startVisualization('bfs')">开始</button>
          </li>
          <li @click="currentView = 'dijkstra'">
            <i class="fas fa-road"></i>
            <span>Dijkstra 最短路径</span>
            <button class="btn btn-small" @click.stop="startVisualization('dijkstra')">开始</button>
          </li>
          <li @click="currentView = 'kruskal'">
            <i class="fas fa-tree"></i>
            <span>Kruskal 最小生成树</span>
            <button class="btn btn-small" @click.stop="startVisualization('kruskal')">开始</button>
          </li>
        </ul>
      </section>

      <section class="graph-visualization" v-if="currentView !== 'list'">
        <div class="visualization-controls">
          <button class="btn" @click="generateNewGraph">生成新图</button>
          <button class="btn btn-primary" @click="startVisualization" :disabled="isVisualizing">
            {{ isVisualizing ? '运行中...' : '开始演示' }}
          </button>
          <button class="btn" @click="resetVisualization" :disabled="isVisualizing">重置</button>
          <div class="speed-control">
            <label>速度：</label>
            <input type="range" v-model="speed" min="1" max="10" value="5" @input="onSpeedChange">
          </div>
        </div>

        <div class="graph-container">
          <svg class="graph-svg" :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`">
            <!-- 边 -->
            <g v-for="(edge, index) in edges" :key="'edge-' + index">
              <line
                :x1="getNodePosition(edge[0]).x"
                :y1="getNodePosition(edge[0]).y"
                :x2="getNodePosition(edge[1]).x"
                :y2="getNodePosition(edge[1]).y"
                :class="getEdgeClass(index)"
                class="graph-edge"
              />
              <text
                :x="(getNodePosition(edge[0]).x + getNodePosition(edge[1]).x) / 2"
                :y="(getNodePosition(edge[0]).y + getNodePosition(edge[1]).y) / 2 - 10"
                class="edge-weight"
              >
                {{ edge[2] || 1 }}
              </text>
            </g>

            <!-- 节点 -->
            <g
              v-for="(node, index) in nodes"
              :key="'node-' + index"
              class="graph-node"
              :class="getNodeClass(index)"
              @click="selectNode(index)"
            >
              <circle
                :cx="nodePositions[index]?.x || 0"
                :cy="nodePositions[index]?.y || 0"
                :r="nodeRadius"
                class="node-circle"
              />
              <text
                :x="nodePositions[index]?.x || 0"
                :y="(nodePositions[index]?.y || 0) + 5"
                class="node-label"
              >
                {{ node }}
              </text>
            </g>
          </svg>

          <div class="graph-status" id="graph-status">
            {{ statusMessage }}
          </div>

          <div class="visualization-info">
            <div class="info-panel">
              <h3>算法说明</h3>
              <p>{{ currentAlgorithmInfo.description }}</p>
            </div>

            <div class="info-panel">
              <h3>代码实现</h3>
              <pre>{{ currentAlgorithmInfo.code }}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="graph-resources">
        <h2>学习资源</h2>
        <ul>
          <li><i class="fas fa-book"></i> 《算法导论》 - 图算法章节</li>
          <li>
            <i class="fas fa-globe"></i>
            <a href="https://oi-wiki.org/graph/" target="_blank">OI Wiki 图论</a>
          </li>
          <li>
            <i class="fas fa-video"></i>
            <a href="https://www.bilibili.com/video/BV1bJ411n7xZ" target="_blank">B站：图算法讲解</a>
          </li>
        </ul>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">算法可视化平台</div>
        <div class="footer-links">
          <a href="/">首页</a>
          <a href="/about">关于我们</a>
          <a href="/contact">联系我们</a>
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
  name: 'GraphVisualization',
  data() {
    return {
      nodes: [],
      edges: [],
      nodePositions: [],
      nodeRadius: 30,
      canvasWidth: 800,
      canvasHeight: 600,
      currentView: 'list',
      isVisualizing: false,
      speed: 5,
      statusMessage: '选择一个算法开始可视化',
      currentAlgorithm: '',
      visitedNodes: [],
      visitedEdges: [],
      currentNode: -1,
      currentEdge: -1,
      algorithmInfo: {
        dfs: {
          name: '深度优先搜索（DFS）',
          description: '深度优先搜索是一种用于遍历或搜索树或图的算法。它沿着一条路径走到底，然后回溯到最近的分支点，继续探索未访问的路径。类似于树的先序遍历。',
          code: `function dfs(graph, start) {
    const visited = new Set();
    
    function visit(node) {
        if (visited.has(node)) return;
        visited.add(node);
        console.log(node);
        
        for (const neighbor of graph[node]) {
            visit(neighbor);
        }
    }
    
    visit(start);
}`
        },
        bfs: {
          name: '广度优先搜索（BFS）',
          description: '广度优先搜索是一种用于遍历或搜索树或图的算法。它从根节点开始，先访问所有相邻节点，再访问邻居的邻居。类似于树的层次遍历。',
          code: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node);
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`
        },
        dijkstra: {
          name: 'Dijkstra 最短路径',
          description: 'Dijkstra算法用于找到图中从一个源节点到所有其他节点的最短路径。它使用贪心策略，每次选择当前距离最小的未访问节点。',
          code: `function dijkstra(graph, start) {
    const dist = {};
    const prev = {};
    const unvisited = new Set();
    
    for (const node in graph) {
        dist[node] = Infinity;
        prev[node] = null;
        unvisited.add(node);
    }
    dist[start] = 0;
    
    while (unvisited.size > 0) {
        let u = null;
        for (const node of unvisited) {
            if (!u || dist[node] < dist[u]) {
                u = node;
            }
        }
        
        if (dist[u] === Infinity) break;
        unvisited.delete(u);
        
        for (const [v, weight] of graph[u]) {
            const alt = dist[u] + weight;
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
            }
        }
    }
    
    return { dist, prev };
}`
        },
        kruskal: {
          name: 'Kruskal 最小生成树',
          description: 'Kruskal算法用于找到无向图的最小生成树。它按照边的权重从小到大排序，依次选择不会形成环的最小边，直到选择 n-1 条边。',
          code: `function kruskal(graph) {
    const edges = [];
    for (const u in graph) {
        for (const [v, w] of graph[u]) {
            edges.push({ u, v, w });
        }
    }
    edges.sort((a, b) => a.w - b.w);
    
    const parent = {};
    for (const node in graph) {
        parent[node] = node;
    }
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    const mst = [];
    for (const { u, v, w } of edges) {
        if (find(u) !== find(v)) {
            parent[find(u)] = find(v);
            mst.push({ u, v, w });
        }
    }
    
    return mst;
}`
        }
      }
    }
  },
  computed: {
    currentAlgorithmInfo() {
      return this.algorithmInfo[this.currentAlgorithm] || {
        name: '',
        description: '',
        code: ''
      }
    }
  },
  methods: {
    generateNewGraph() {
      const nodeCount = Math.floor(Math.random() * 3) + 6 // 6-8个节点
      this.nodes = Array.from({ length: nodeCount }, (_, i) => i)

      // 生成边
      this.edges = []
      const edgeSet = new Set()

      // 确保图是连通的
      for (let i = 1; i < nodeCount; i++) {
        const j = Math.floor(Math.random() * i)
        const weight = Math.floor(Math.random() * 10) + 1
        this.edges.push([j, i, weight])
        edgeSet.add(`${Math.min(j, i)}-${Math.max(j, i)}`)
      }

      // 添加一些额外的边
      const extraEdges = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < extraEdges; i++) {
        const u = Math.floor(Math.random() * nodeCount)
        const v = Math.floor(Math.random() * nodeCount)
        if (u !== v) {
          const key = `${Math.min(u, v)}-${Math.max(u, v)}`
          if (!edgeSet.has(key)) {
            const weight = Math.floor(Math.random() * 10) + 1
            this.edges.push([u, v, weight])
            edgeSet.add(key)
          }
        }
      }

      // 计算节点位置（圆形布局）
      this.calculateNodePositions()
      this.resetVisualization()
    },

    calculateNodePositions() {
      const centerX = this.canvasWidth / 2
      const centerY = this.canvasHeight / 2
      const radius = Math.min(centerX, centerY) - 60

      this.nodePositions = this.nodes.map((_, index) => {
        const angle = (2 * Math.PI * index) / this.nodes.length - Math.PI / 2
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        }
      })
    },

    getNodePosition(node) {
      return this.nodePositions[node] || { x: 0, y: 0 }
    },

    getNodeClass(index) {
      const classes = []
      if (this.visitedNodes.includes(index)) {
        classes.push('visited')
      }
      if (this.currentNode === index) {
        classes.push('current')
      }
      return classes.join(' ')
    },

    getEdgeClass(index) {
      const classes = []
      if (this.visitedEdges.includes(index)) {
        classes.push('visited')
      }
      if (this.currentEdge === index) {
        classes.push('current')
      }
      return classes.join(' ')
    },

    selectNode(index) {
      if (!this.isVisualizing) {
        this.statusMessage = `已选择节点 ${index}`
      }
    },

    startVisualization(algorithm = null) {
      if (algorithm) {
        this.currentAlgorithm = algorithm
      }

      if (!this.currentAlgorithm || this.nodes.length === 0) {
        this.statusMessage = '请先生成图并选择算法'
        return
      }

      this.isVisualizing = true
      this.visitedNodes = []
      this.visitedEdges = []
      this.currentNode = -1
      this.currentEdge = -1

      const intervalTime = 1000 / this.speed

      switch (this.currentAlgorithm) {
        case 'dfs':
          this.visualizeDFS(intervalTime)
          break
        case 'bfs':
          this.visualizeBFS(intervalTime)
          break
        case 'dijkstra':
          this.visualizeDijkstra(intervalTime)
          break
        case 'kruskal':
          this.visualizeKruskal(intervalTime)
          break
      }
    },

    buildAdjacencyList() {
      const graph = {}
      this.nodes.forEach(node => {
        graph[node] = []
      })

      this.edges.forEach((edge, index) => {
        const [u, v, w] = edge
        if (!graph[u]) graph[u] = []
        if (!graph[v]) graph[v] = []
        graph[u].push({ node: v, weight: w || 1, edgeIndex: index })
        graph[v].push({ node: u, weight: w || 1, edgeIndex: index })
      })

      return graph
    },

    visualizeDFS(intervalTime) {
      const graph = this.buildAdjacencyList()
      const visited = new Set()
      const stepOrder = []

      const dfs = (node) => {
        if (visited.has(node)) return
        visited.add(node)
        stepOrder.push({ type: 'node', value: node })

        for (const { node: neighbor, edgeIndex } of graph[node]) {
          if (!visited.has(neighbor)) {
            stepOrder.push({ type: 'edge', value: edgeIndex })
            dfs(neighbor)
          }
        }
      }

      dfs(0)

      let step = 0
      const timer = setInterval(() => {
        if (step >= stepOrder.length) {
          clearInterval(timer)
          this.isVisualizing = false
          this.statusMessage = 'DFS 完成！遍历顺序：' + this.visitedNodes.join(' -> ')
          return
        }

        const currentStep = stepOrder[step]
        if (currentStep.type === 'node') {
          this.currentNode = currentStep.value
          if (!this.visitedNodes.includes(currentStep.value)) {
            this.visitedNodes.push(currentStep.value)
          }
          this.statusMessage = `访问节点 ${currentStep.value}`
        } else {
          this.currentEdge = currentStep.value
          if (!this.visitedEdges.includes(currentStep.value)) {
            this.visitedEdges.push(currentStep.value)
          }
          const [u, v] = this.edges[currentStep.value]
          this.statusMessage = `探索边 ${u} -> ${v}`
        }

        step++
      }, intervalTime)
    },

    visualizeBFS(intervalTime) {
      const graph = this.buildAdjacencyList()
      const visited = new Set()
      const queue = [0]
      const stepOrder = []

      visited.add(0)

      while (queue.length > 0) {
        const node = queue.shift()
        stepOrder.push({ type: 'node', value: node })

        for (const { node: neighbor, edgeIndex } of graph[node]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push(neighbor)
            stepOrder.push({ type: 'edge', value: edgeIndex })
          }
        }
      }

      let step = 0
      const timer = setInterval(() => {
        if (step >= stepOrder.length) {
          clearInterval(timer)
          this.isVisualizing = false
          this.statusMessage = 'BFS 完成！遍历顺序：' + this.visitedNodes.join(' -> ')
          return
        }

        const currentStep = stepOrder[step]
        if (currentStep.type === 'node') {
          this.currentNode = currentStep.value
          if (!this.visitedNodes.includes(currentStep.value)) {
            this.visitedNodes.push(currentStep.value)
          }
          this.statusMessage = `访问节点 ${currentStep.value}`
        } else {
          this.currentEdge = currentStep.value
          if (!this.visitedEdges.includes(currentStep.value)) {
            this.visitedEdges.push(currentStep.value)
          }
          const [u, v] = this.edges[currentStep.value]
          this.statusMessage = `探索边 ${u} -> ${v}`
        }

        step++
      }, intervalTime)
    },

    visualizeDijkstra(intervalTime) {
      const n = this.nodes.length
      const dist = Array(n).fill(Infinity)
      const prev = Array(n).fill(-1)
      const visited = Array(n).fill(false)

      dist[0] = 0
      let step = 0
      const totalSteps = n

      const timer = setInterval(() => {
        if (step >= totalSteps) {
          clearInterval(timer)
          this.isVisualizing = false
          const paths = []
          for (let i = 1; i < n; i++) {
            if (dist[i] !== Infinity) {
              paths.push(`节点${i}: ${dist[i]}`)
            }
          }
          this.statusMessage = `Dijkstra 完成！最短距离：${paths.join(', ')}`
          return
        }

        let u = -1
        for (let i = 0; i < n; i++) {
          if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
            u = i
          }
        }

        if (u === -1 || dist[u] === Infinity) {
          clearInterval(timer)
          this.isVisualizing = false
          this.statusMessage = 'Dijkstra 完成！'
          return
        }

        visited[u] = true
        this.currentNode = u
        if (!this.visitedNodes.includes(u)) {
          this.visitedNodes.push(u)
        }
        this.statusMessage = `访问节点 ${u}，距离：${dist[u]}`

        // 模拟更新邻居距离
        const graph = this.buildAdjacencyList()
        for (const { node: v, weight, edgeIndex } of graph[u]) {
          if (!visited[v] && dist[v] > dist[u] + weight) {
            dist[v] = dist[u] + weight
            prev[v] = u
            this.currentEdge = edgeIndex
            if (!this.visitedEdges.includes(edgeIndex)) {
              this.visitedEdges.push(edgeIndex)
            }
          }
        }

        step++
      }, intervalTime)
    },

    visualizeKruskal(intervalTime) {
      const n = this.nodes.length
      const sortedEdges = this.edges
        .map((edge, index) => ({ ...edge, index }))
        .sort((a, b) => a[2] - b[2])

      const parent = Array(n).fill(0).map((_, i) => i)

      const find = (x) => {
        if (parent[x] !== x) {
          parent[x] = find(parent[x])
        }
        return parent[x]
      }

      const mst = []
      let step = 0
      const timer = setInterval(() => {
        if (step >= sortedEdges.length || mst.length >= n - 1) {
          clearInterval(timer)
          this.isVisualizing = false
          const mstEdges = mst.map(e => `${e[0]}-${e[1]}`)
          this.statusMessage = `Kruskal 完成！最小生成树边：${mstEdges.join(', ')}`
          return
        }

        const { 0: u, 1: v, 2: w, index: edgeIndex } = sortedEdges[step]
        const pu = find(u)
        const pv = find(v)

        this.currentEdge = edgeIndex
        const [edgeU, edgeV] = this.edges[edgeIndex]
        this.statusMessage = `检查边 ${edgeU} - ${edgeV}，权重：${w}`

        if (pu !== pv) {
          parent[pu] = pv
          mst.push([u, v, w])
          if (!this.visitedEdges.includes(edgeIndex)) {
            this.visitedEdges.push(edgeIndex)
          }
          if (!this.visitedNodes.includes(u)) {
            this.visitedNodes.push(u)
          }
          if (!this.visitedNodes.includes(v)) {
            this.visitedNodes.push(v)
          }
          this.statusMessage = `选择边 ${u} - ${v}，权重：${w}`
        }

        step++
      }, intervalTime)
    },

    resetVisualization() {
      this.isVisualizing = false
      this.visitedNodes = []
      this.visitedEdges = []
      this.currentNode = -1
      this.currentEdge = -1
      this.statusMessage = '图已重置，选择算法开始可视化'
    },

    onSpeedChange() {
      // 速度变化时不需要立即更新，因为是基于定时器的
    },

    mounted() {
      // 初始化
    }
  }
}
</script>

<style scoped>
.algorithm-platform {
  font-family: 'Noto Sans SC', 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333333;
  background-color: #f4f6f9;
  min-height: 100vh;
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

.graph-header {
  padding: 3rem 5%;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.graph-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.graph-header p {
  font-size: 1.2rem;
  opacity: 0.95;
}

.graph-list {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 5%;
}

.graph-list h2 {
  font-size: 2rem;
  color: #16202b;
  margin-bottom: 2rem;
  text-align: center;
}

.graph-list ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.graph-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.graph-list li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.graph-list li i {
  font-size: 2rem;
  color: #007bff;
  width: 50px;
}

.graph-list li span {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: #16202b;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #e9ecef;
  color: #495057;
}

.btn:hover:not(:disabled) {
  background: #dee2e6;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

.graph-visualization {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5% 3rem;
}

.visualization-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.speed-control input[type="range"] {
  width: 120px;
}

.graph-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.graph-svg {
  width: 100%;
  height: 600px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.graph-edge {
  stroke: #adb5bd;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.graph-edge.visited {
  stroke: #28a745;
  stroke-width: 4;
}

.graph-edge.current {
  stroke: #ffc107;
  stroke-width: 5;
  animation: edge-pulse 0.6s ease-in-out infinite;
}

.edge-weight {
  font-size: 14px;
  fill: #6c757d;
  font-weight: 600;
  text-anchor: middle;
}

.graph-node {
  cursor: pointer;
}

.node-circle {
  fill: #007bff;
  stroke: #0056b3;
  stroke-width: 3;
  transition: all 0.3s ease;
}

.graph-node:hover .node-circle {
  fill: #0056b3;
  transform: scale(1.1);
}

.graph-node.visited .node-circle {
  fill: #28a745;
  stroke: #218838;
}

.graph-node.current .node-circle {
  fill: #ffc107;
  stroke: #ff9800;
  animation: node-pulse 0.6s ease-in-out infinite;
}

.node-label {
  fill: #ffffff;
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
  pointer-events: none;
}

@keyframes node-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@keyframes edge-pulse {
  0%, 100% {
    stroke-width: 4;
  }
  50% {
    stroke-width: 6;
  }
}

.graph-status {
  padding: 1.5rem;
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #16202b;
  margin-bottom: 2rem;
}

.visualization-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.info-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.info-panel h3 {
  font-size: 1.3rem;
  color: #16202b;
  margin-bottom: 1rem;
}

.info-panel p {
  color: #495057;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.info-panel pre {
  background: #2c3e50;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.graph-resources {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 5%;
}

.graph-resources h2 {
  font-size: 2rem;
  color: #16202b;
  margin-bottom: 2rem;
  text-align: center;
}

.graph-resources ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.graph-resources li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.graph-resources li i {
  font-size: 1.5rem;
  color: #007bff;
}

.footer {
  background: linear-gradient(to right, #1f2d3d, #16202b);
  color: #ffffff;
  padding: 2rem 5%;
  margin-top: 3rem;
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
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-copyright {
  color: #abb2bf;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .graph-svg {
    height: 400px;
  }

  .visualization-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .speed-control {
    margin-left: 0;
  }

  .visualization-info {
    grid-template-columns: 1fr;
  }

  .graph-header h1 {
    font-size: 2rem;
  }
}
</style>
