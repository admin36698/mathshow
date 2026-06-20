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
      <div class="container">
        <section class="algorithm-header">
          <h1>动态规划可视化</h1>
          <p>观察动态规划问题的解决过程，理解问题分解与最优子结构</p>
        </section>

        <section class="algorithm-visualization">
          <div class="visualization-controls">
            <div class="algorithm-selector">
              <label for="dp-algo-select">选择动态规划问题：</label>
              <select v-model="selectedProblem" id="dp-algo-select" @change="onProblemChange">
                <option value="fibonacci">斐波那契数列</option>
                <option value="knapsack">0-1背包问题</option>
                <option value="lcs">最长公共子序列</option>
                <option value="coinChange">零钱兑换问题</option>
              </select>
            </div>

            <div class="dp-input-container">
              <template v-if="selectedProblem === 'fibonacci'">
                <label for="fib-n">计算斐波那契数列第 N 项：</label>
                <input
                  type="number"
                  v-model.number="fibN"
                  id="fib-n"
                  min="1"
                  max="20"
                  placeholder="1-20"
                />
              </template>

              <template v-else-if="selectedProblem === 'knapsack'">
                <div>
                  <label>背包容量：</label>
                  <input
                    type="number"
                    v-model.number="knapsackCapacity"
                    min="1"
                    max="50"
                    placeholder="1-50"
                  />
                </div>
                <div class="items-input">
                  <label>物品（重量, 价值）：</label>
                  <div class="item-list">
                    <div v-for="(item, index) in knapsackItems" :key="index" class="item-row">
                      <span>物品 {{ index + 1 }}:</span>
                      <input
                        type="number"
                        v-model.number="item.weight"
                        min="1"
                        max="30"
                        placeholder="重量"
                      />
                      <input
                        type="number"
                        v-model.number="item.value"
                        min="1"
                        max="100"
                        placeholder="价值"
                      />
                      <button class="btn-remove" @click="removeKnapsackItem(index)">×</button>
                    </div>
                  </div>
                  <button class="btn" @click="addKnapsackItem">添加物品</button>
                </div>
              </template>

              <template v-else-if="selectedProblem === 'lcs'">
                <div>
                  <label>字符串 1：</label>
                  <input
                    type="text"
                    v-model="lcsStr1"
                    placeholder="例如: ABCBDAB"
                    maxlength="10"
                  />
                </div>
                <div>
                  <label>字符串 2：</label>
                  <input
                    type="text"
                    v-model="lcsStr2"
                    placeholder="例如: BDCAB"
                    maxlength="10"
                  />
                </div>
              </template>

              <template v-else-if="selectedProblem === 'coinChange'">
                <div>
                  <label>目标金额：</label>
                  <input
                    type="number"
                    v-model.number="coinAmount"
                    min="1"
                    max="100"
                    placeholder="1-100"
                  />
                </div>
                <div class="coins-input">
                  <label>可用硬币面额：</label>
                  <input
                    type="text"
                    v-model="coinDenominations"
                    placeholder="例如: 1, 5, 10, 25"
                  />
                </div>
              </template>
            </div>

            <div class="control-buttons">
              <button class="btn btn-primary" @click="startDP" :disabled="isRunning">
                {{ isRunning ? '运行中...' : '开始计算' }}
              </button>
              <button class="btn" @click="pauseDP" :disabled="!isRunning">{{ isPaused ? '开始' : '暂停' }}</button>
              <button class="btn" @click="resetDP">重置</button>
            </div>

            <div class="speed-control">
              <label for="dp-speed-slider">速度：</label>
              <input
                type="range"
                v-model="speed"
                id="dp-speed-slider"
                min="1"
                max="10"
                value="5"
              />
            </div>
          </div>

          <div class="visualization-container">
            <div class="dp-table-container">
              <table class="dp-table" v-if="dpTable.length > 0">
                <thead>
                  <tr>
                    <th v-for="(header, index) in dpTableHeaders" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in dpTable" :key="rowIndex">
                    <td
                      v-for="(cell, colIndex) in row"
                      :key="colIndex"
                      :class="getCellClass(rowIndex, colIndex)"
                    >
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="dp-result" v-if="result !== null">
              <h3>计算结果</h3>
              <div class="result-value">{{ result }}</div>
              <div class="result-description" v-if="resultDescription">
                {{ resultDescription }}
              </div>
            </div>

            <div class="algorithm-info">
              <div class="info-panel">
                <h3>算法解析</h3>
                <div class="dp-description">
                  <h4>{{ currentProblemInfo.name }}</h4>
                  <p>{{ currentProblemInfo.description }}</p>
                </div>
              </div>

              <div class="info-panel">
                <h3>代码实现</h3>
                <pre>{{ currentProblemInfo.code }}</pre>
              </div>
            </div>
          </div>
        </section>
      </div>
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
  name: 'DynamicProgramming',
  data() {
    return {
      selectedProblem: 'fibonacci',
      speed: 5,
      isRunning: false,
      isPaused: false,
      timer: null,
      dpTable: [],
      dpTableHeaders: [],
      highlightedCells: [],
      currentCell: null,
      result: null,
      resultDescription: '',

      // 斐波那契参数
      fibN: 10,

      // 背包问题参数
      knapsackCapacity: 10,
      knapsackItems: [
        { weight: 2, value: 6 },
        { weight: 2, value: 10 },
        { weight: 3, value: 12 }
      ],

      // LCS 参数
      lcsStr1: 'ABCBDAB',
      lcsStr2: 'BDCAB',

      // 零钱兑换参数
      coinAmount: 11,
      coinDenominations: '1, 2, 5',

      problemInfo: {
        fibonacci: {
          name: '斐波那契数列',
          description: '斐波那契数列是一个经典的动态规划问题。每个数是前两个数的和。通过将问题分解为更小的子问题，并存储子问题的解来避免重复计算。',
          code: `// 自底向上方法
function fibonacci(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 优化空间复杂度
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    
    return curr;
}`
        },
        knapsack: {
          name: '0-1背包问题',
          description: '给定一组物品，每个物品有重量和价值，在不超过背包容量的前提下，选择物品使得总价值最大。每个物品只能选择一次。',
          code: `function knapsack(capacity, items) {
    const n = items.length;
    const dp = Array(n + 1)
        .fill(null)
        .map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        const { weight, value } = items[i - 1];
        for (let w = 0; w <= capacity; w++) {
            if (weight <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weight] + value
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`
        },
        lcs: {
          name: '最长公共子序列',
          description: '给定两个字符串，找到它们的最长公共子序列的长度。子序列是保持相对顺序但不必连续的元素序列。',
          code: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                );
            }
        }
    }
    
    return dp[m][n];
}`
        },
        coinChange: {
          name: '零钱兑换问题',
          description: '给定一组硬币面额和一个目标金额，计算凑成目标金额所需的最少硬币数量。每种硬币可以使用无限次。',
          code: `function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0 && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}`
        }
      }
    }
  },
  computed: {
    currentProblemInfo() {
      return this.problemInfo[this.selectedProblem]
    }
  },
  methods: {
    addKnapsackItem() {
      this.knapsackItems.push({ weight: 1, value: 1 })
    },

    removeKnapsackItem(index) {
      if (this.knapsackItems.length > 1) {
        this.knapsackItems.splice(index, 1)
      }
    },

    onProblemChange() {
      this.resetDP()
    },

    startDP() {
      if (this.isRunning) return

      this.isRunning = true
      this.isPaused = false

      switch (this.selectedProblem) {
        case 'fibonacci':
          this.solveFibonacci()
          break
        case 'knapsack':
          this.solveKnapsack()
          break
        case 'lcs':
          this.solveLCS()
          break
        case 'coinChange':
          this.solveCoinChange()
          break
      }
    },

    solveFibonacci() {
      const n = this.fibN
      if (n < 1 || n > 20) {
        alert('请输入1-20之间的数字')
        this.isRunning = false
        return
      }

      this.dpTable = []
      this.dpTableHeaders = Array.from({ length: n + 1 }, (_, i) => i)

      const dp = [0, 1]
      this.dpTable.push([...dp])

      let step = 2
      const intervalTime = 1000 / this.speed

      this.timer = setInterval(() => {
        if (this.isPaused) return

        if (step > n) {
          clearInterval(this.timer)
          this.isRunning = false
          this.result = dp[n]
          this.resultDescription = `斐波那契数列第 ${n} 项是 ${this.result}`
          return
        }

        dp[step] = dp[step - 1] + dp[step - 2]
        this.dpTable.push([...dp])
        this.highlightedCells = [{ row: 0, col: step }]

        step++
      }, intervalTime)
    },

    solveKnapsack() {
      const capacity = this.knapsackCapacity
      const items = this.knapsackItems.filter(
        item => item.weight > 0 && item.value > 0
      )

      if (items.length === 0) {
        alert('请添加有效的物品')
        this.isRunning = false
        return
      }

      const n = items.length
      const dp = Array(n + 1)
        .fill(null)
        .map(() => Array(capacity + 1).fill(0))

      this.dpTableHeaders = ['物品\\容量', ...Array.from({ length: capacity + 1 }, (_, i) => i)]

      // 先填充表头
      this.dpTable = [this.dpTableHeaders.map((h, i) => i === 0 ? '' : h)]

      for (let i = 1; i <= n; i++) {
        const row = [i - 1]
        for (let w = 0; w <= capacity; w++) {
          const weight = items[i - 1].weight
          const value = items[i - 1].value

          if (weight <= w) {
            dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value)
          } else {
            dp[i][w] = dp[i - 1][w]
          }
          row.push(dp[i][w])
        }
        this.dpTable.push(row)
      }

      // 逐步高亮显示
      let row = 1
      let col = 0
      const intervalTime = 1000 / this.speed

      this.timer = setInterval(() => {
        if (this.isPaused) return

        if (row > n) {
          clearInterval(this.timer)
          this.isRunning = false
          this.result = dp[n][capacity]
          this.resultDescription = `最大价值为 ${this.result}`
          this.highlightedCells = []
          return
        }

        if (col <= capacity) {
          this.highlightedCells = [{ row, col }]
          col++
        } else {
          row++
          col = 0
        }
      }, intervalTime)
    },

    solveLCS() {
      const text1 = this.lcsStr1.toUpperCase()
      const text2 = this.lcsStr2.toUpperCase()

      if (!text1 || !text2) {
        alert('请输入两个非空字符串')
        this.isRunning = false
        return
      }

      const m = text1.length
      const n = text2.length
      const dp = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0))

      this.dpTableHeaders = ['', ...text2.split('')]

      // 先填充表头
      this.dpTable = [this.dpTableHeaders.map((h, i) => i === 0 ? '' : h)]

      for (let i = 1; i <= m; i++) {
        const row = [text1[i - 1]]
        for (let j = 1; j <= n; j++) {
          if (text1[i - 1] === text2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
          }
          row.push(dp[i][j])
        }
        this.dpTable.push(row)
      }

      // 逐步高亮
      let row = 1
      let col = 1
      const intervalTime = 1000 / this.speed

      this.timer = setInterval(() => {
        if (this.isPaused) return

        if (row > m) {
          clearInterval(this.timer)
          this.isRunning = false
          this.result = dp[m][n]
          this.resultDescription = `最长公共子序列长度为 ${this.result}`
          this.highlightedCells = []
          return
        }

        if (col <= n) {
          this.highlightedCells = [{ row, col }]
          col++
        } else {
          row++
          col = 1
        }
      }, intervalTime)
    },

    solveCoinChange() {
      const amount = this.coinAmount
      const coins = this.coinDenominations
        .split(',')
        .map(c => parseInt(c.trim()))
        .filter(c => !isNaN(c) && c > 0)

      if (coins.length === 0 || amount <= 0) {
        alert('请输入有效的硬币面额和目标金额')
        this.isRunning = false
        return
      }

      coins.sort((a, b) => a - b)

      const dp = Array(amount + 1).fill(Infinity)
      dp[0] = 0

      this.dpTableHeaders = ['金额', ...Array.from({ length: amount + 1 }, (_, i) => i)]
      this.dpTable = [this.dpTableHeaders]

      let step = 1
      const intervalTime = 1000 / this.speed

      this.timer = setInterval(() => {
        if (this.isPaused) return

        if (step > amount) {
          clearInterval(this.timer)
          this.isRunning = false
          this.result = dp[amount] === Infinity ? -1 : dp[amount]
          this.resultDescription =
            this.result === -1
              ? '无法用给定的硬币凑成目标金额'
              : `最少需要 ${this.result} 枚硬币`
          this.highlightedCells = []
          return
        }

        for (const coin of coins) {
          if (step - coin >= 0 && dp[step - coin] !== Infinity) {
            dp[step] = Math.min(dp[step], dp[step - coin] + 1)
          }
        }

        const row = ['dp[' + step + ']', ...dp.slice(0, step + 1)]
        this.dpTable.push(row)
        this.highlightedCells = [{ row: step, col: step }]

        step++
      }, intervalTime)
    },

    pauseDP() {
      this.isPaused = !this.isPaused
    },

    resetDP() {
      this.stopTimer()
      this.isRunning = false
      this.isPaused = false
      this.dpTable = []
      this.dpTableHeaders = []
      this.highlightedCells = []
      this.currentCell = null
      this.result = null
      this.resultDescription = ''
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    getCellClass(rowIndex, colIndex) {
      const isHighlighted = this.highlightedCells.some(
        cell => cell.row === rowIndex && cell.col === colIndex
      )

      return {
        highlighted: isHighlighted,
        'current-row': this.highlightedCells.length > 0 && this.highlightedCells[0].row === rowIndex
      }
    }
  },
  beforeUnmount() {
    this.stopTimer()
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

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

.algorithm-header {
  padding: 3rem 0 2rem;
  text-align: center;
}

.algorithm-header h1 {
  font-size: 2.5rem;
  color: #16202b;
  margin-bottom: 1rem;
}

.algorithm-header p {
  font-size: 1.2rem;
  color: #6c757d;
}

.algorithm-visualization {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.visualization-controls {
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.algorithm-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.algorithm-selector select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.dp-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.dp-input-container > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dp-input-container input {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.items-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-row input {
  width: 80px;
}

.btn-remove {
  padding: 0.4rem 0.8rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.btn-remove:hover {
  background: #c82333;
}

.coins-input input {
  width: 200px;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
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

.speed-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.speed-control input[type="range"] {
  width: 120px;
}

.visualization-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dp-table-container {
  overflow-x: auto;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.dp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.dp-table th,
.dp-table td {
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  text-align: center;
  min-width: 50px;
}

.dp-table th {
  background: #007bff;
  color: #ffffff;
  font-weight: 600;
}

.dp-table td:first-child {
  background: #e9ecef;
  font-weight: 600;
  color: #495057;
}

.dp-table td.highlighted {
  background: #ffc107;
  color: #ffffff;
  font-weight: 700;
  animation: cell-pulse 0.6s ease-in-out infinite;
}

.dp-table td.current-row {
  background: #e3f2fd;
}

@keyframes cell-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.dp-result {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: #ffffff;
  text-align: center;
}

.dp-result h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.result-value {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.result-description {
  font-size: 1.1rem;
  opacity: 0.95;
}

.algorithm-info {
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

.info-panel h4 {
  font-size: 1.1rem;
  color: #16202b;
  margin-bottom: 0.5rem;
}

.dp-description p {
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
  .visualization-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .algorithm-info {
    grid-template-columns: 1fr;
  }

  .dp-table {
    font-size: 0.85rem;
  }

  .dp-table th,
  .dp-table td {
    padding: 0.5rem;
    min-width: 40px;
  }
}
</style>
