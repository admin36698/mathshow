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
      <section class="algorithm-header">
        <h1>搜索算法可视化</h1>
        <p>观察搜索算法如何在数据集中定位目标值，比较不同搜索策略的效率</p>
      </section>

      <section class="algorithm-visualization">
        <div class="search-layout">
          <aside class="search-sidebar">
            <div class="visualization-controls">
              <div class="algorithm-selector">
                <label for="algo-select">选择搜索算法：</label>
                <select v-model="selectedAlgorithm" id="algo-select" @change="onAlgorithmChange">
                  <option value="binary">二分查找</option>
                  <option value="linear">线性查找</option>
                  <option value="hash">哈希查找</option>
                </select>
              </div>

              <div class="search-input">
                <label for="search-value">搜索目标值：</label>
                <input
                  type="number"
                  v-model.number="searchValue"
                  id="search-value"
                  min="1"
                  max="100"
                  placeholder="1-100"
                />
                <button class="btn btn-primary" @click="startSearch" :disabled="isSearching">
                  开始搜索
                </button>
              </div>

              <div class="control-buttons">
                <button class="btn" @click="generateNewArray" :disabled="isSearching">
                  生成新数组
                </button>
                <button class="btn" @click="resetVisualization" :disabled="isSearching">
                  重置
                </button>
              </div>

              <div class="speed-control">
                <label for="speed-slider">速度：</label>
                <input
                  type="range"
                  v-model="speed"
                  id="speed-slider"
                  min="1"
                  max="10"
                  value="5"
                  @input="onSpeedChange"
                />
              </div>

              <div class="size-control">
                <label for="size-slider">数组大小：</label>
                <input
                  type="range"
                  v-model.number="arraySize"
                  id="size-slider"
                  min="10"
                  max="50"
                  value="20"
                  @input="generateNewArray"
                />
              </div>
            </div>

            <div class="algorithm-info">
              <div class="info-panel">
                <h3>算法解析</h3>
                <div id="algorithm-description">
                  <h4>{{ currentAlgorithmName }}</h4>
                  <p>{{ algorithmInfo[currentAlgorithmKey]?.description }}</p>
                  <p><strong>时间复杂度：</strong>{{ algorithmInfo[currentAlgorithmKey]?.timeComplexity }}</p>
                  <p><strong>空间复杂度：</strong>{{ algorithmInfo[currentAlgorithmKey]?.spaceComplexity }}</p>
                  <p v-if="algorithmInfo[currentAlgorithmKey]?.note"><strong>注意：</strong>{{ algorithmInfo[currentAlgorithmKey]?.note }}</p>
                </div>
              </div>

              <div class="info-panel">
                <h3>代码实现</h3>
                <pre>{{ algorithmInfo[currentAlgorithmKey]?.code }}</pre>
              </div>
            </div>
          </aside>

          <main class="search-main">
            <div class="visualization-container">
              <div class="progress-indicator" v-if="isSearching" :style="{ width: progress + '%' }">
                {{ progress }}%
              </div>

              <div class="array-container search-array">
                <div
                  v-for="(value, index) in array"
                  :key="index"
                  class="array-element"
                  :class="getElementClass(index)"
                >
                  <span class="array-value">{{ value }}</span>
                  <span class="array-index">{{ index }}</span>
                </div>
              </div>

              <div class="hash-table" v-if="selectedAlgorithm === 'hash'" style="display: none;">
                <div
                  v-for="(bucket, key) in hashTable"
                  :key="key"
                  class="hash-bucket"
                >
                  <div class="hash-bucket-label">{{ key }}</div>
                  <div class="hash-bucket-elements">
                    <div
                      v-for="(item, idx) in bucket"
                      :key="idx"
                      class="array-element hash-element"
                      :class="getHashElementClass(item.index)"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="search-result" :class="resultClass">
                {{ resultMessage }}
              </div>
            </div>
          </main>
        </div>
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
  name: 'SearchingVisualization',
  data() {
    return {
      array: [],
      hashTable: {},
      selectedAlgorithm: 'binary',
      searchValue: 50,
      speed: 5,
      arraySize: 20,
      isSearching: false,
      currentInterval: null,
      progress: 0,
      resultMessage: '',
      resultClass: '',
      currentHighlightedIndices: [],
      foundIndex: -1,
      visitedIndices: [],
      searchInterval: [],
      hashHighlightIndex: -1,
      algorithmInfo: {
        binary: {
          name: '二分查找',
          description: '二分查找是一种高效的搜索算法，适用于已排序的数组。通过将搜索区间反复折半，每次将目标值与区间中点进行比较，从而快速缩小搜索范围。',
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(1)',
          note: '二分查找仅适用于已排序的数据集。',
          code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid; // 找到目标值，返回索引
        } else if (arr[mid] < target) {
            left = mid + 1; // 目标在右半部分
        } else {
            right = mid - 1; // 目标在左半部分
        }
    }
    return -1; // 未找到目标值
}`
        },
        linear: {
          name: '线性查找',
          description: '线性查找是一种简单直接的搜索算法，它会按顺序遍历数组中的每个元素，直到找到目标值或遍历完整个数组。',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          note: '线性查找适用于任何类型的数据集。',
          code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // 找到目标值，返回索引
        }
    }
    return -1; // 未找到目标值
}`
        },
        hash: {
          name: '哈希查找',
          description: '哈希查找利用哈希表数据结构，通过哈希函数将键映射到表中的位置来访问记录，实现快速查找。',
          timeComplexity: '平均O(1)，最坏O(n)',
          spaceComplexity: 'O(n)',
          note: '哈希查找需要额外的空间来存储哈希表，但查找效率非常高。',
          code: `// 创建哈希表
function createHashTable(arr) {
    const table = {};
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i] % 10; // 简单的哈希函数
        if (!table[key]) {
            table[key] = [];
        }
        table[key].push({ value: arr[i], index: i });
    }
    return table;
}

// 哈希查找
function hashSearch(table, target) {
    const key = target % 10;
    if (!table[key]) return -1;
    
    for (const item of table[key]) {
        if (item.value === target) {
            return item.index;
        }
    }
    return -1;
}`
        }
      }
    }
  },
  computed: {
    currentAlgorithmKey() {
      return this.selectedAlgorithm
    },
    currentAlgorithmName() {
      return this.algorithmInfo[this.currentAlgorithmKey]?.name || '未知算法'
    }
  },
  mounted() {
    this.generateNewArray()
  },
  beforeUnmount() {
    this.stopSearch()
  },
  methods: {
    generateArray(size) {
      const arr = []
      const used = new Set()

      while (arr.length < size) {
        const num = Math.floor(Math.random() * 100) + 1
        if (!used.has(num)) {
          used.add(num)
          arr.push(num)
        }
      }

      return arr.sort((a, b) => a - b)
    },

    generateNewArray() {
      if (this.isSearching) return

      this.array = this.generateArray(this.arraySize)
      this.createHashTable()
      this.resetState()
      this.resultMessage = '新数组已生成'
      this.resultClass = ''
    },

    createHashTable() {
      const table = {}
      const HASH_MOD = 10

      for (let i = 0; i < this.array.length; i++) {
        const key = this.array[i] % HASH_MOD
        if (!table[key]) {
          table[key] = []
        }
        table[key].push({ value: this.array[i], index: i })
      }

      this.hashTable = table
    },

    resetState() {
      this.isSearching = false
      this.progress = 0
      this.currentHighlightedIndices = []
      this.foundIndex = -1
      this.visitedIndices = []
      this.searchInterval = []
      this.hashHighlightIndex = -1
      this.stopSearch()
    },

    resetVisualization() {
      this.stopSearch()
      this.generateNewArray()
    },

    startSearch() {
      if (this.isSearching) return

      if (!this.searchValue || this.searchValue < 1 || this.searchValue > 100) {
        this.showResult(`请输入1-100之间的有效数字`, false)
        return
      }

      this.resetState()
      this.isSearching = true
      this.progress = 0
      this.showResult(`正在搜索 ${this.searchValue}...`, false)

      const intervalTime = 1000 / this.speed

      if (this.selectedAlgorithm === 'binary') {
        this.binarySearchVisualization(intervalTime)
      } else if (this.selectedAlgorithm === 'linear') {
        this.linearSearchVisualization(intervalTime)
      } else if (this.selectedAlgorithm === 'hash') {
        this.hashSearchVisualization(intervalTime)
      }
    },

    binarySearchVisualization(intervalTime) {
      let left = 0
      let right = this.array.length - 1
      let step = 0
      const maxSteps = Math.ceil(Math.log2(this.array.length)) + 1

      this.currentInterval = setInterval(() => {
        if (left <= right) {
          const mid = Math.floor((left + right) / 2)

          // 重置高亮
          this.currentHighlightedIndices = []
          this.visitedIndices.forEach(() => {
            // 保持visited状态
          })

          // 高亮当前搜索区间
          this.searchInterval = Array.from({ length: right - left + 1 }, (_, i) => left + i)
          this.currentHighlightedIndices = [mid]
          this.visitedIndices.push(mid)

          if (this.array[mid] === this.searchValue) {
            clearInterval(this.currentInterval)
            this.foundIndex = mid
            this.showResult(`找到目标值 ${this.searchValue}，索引为 ${mid}`, true)
            this.progress = 100
            this.isSearching = false
          } else if (this.array[mid] < this.searchValue) {
            left = mid + 1
            this.showResult(`目标值 ${this.searchValue} > arr[${mid}]=${this.array[mid]}，搜索右半部分`, false)
          } else {
            right = mid - 1
            this.showResult(`目标值 ${this.searchValue} < arr[${mid}]=${this.array[mid]}，搜索左半部分`, false)
          }

          step++
          this.progress = Math.min(Math.round((step / maxSteps) * 100), 100)
        } else {
          clearInterval(this.currentInterval)
          this.showResult(`未找到目标值 ${this.searchValue}`, false)
          this.progress = 100
          this.isSearching = false
        }
      }, intervalTime)
    },

    linearSearchVisualization(intervalTime) {
      let index = 0

      this.currentInterval = setInterval(() => {
        if (index < this.array.length) {
          this.currentHighlightedIndices = [index]
          this.visitedIndices.push(index)

          if (this.array[index] === this.searchValue) {
            clearInterval(this.currentInterval)
            this.foundIndex = index
            this.showResult(`找到目标值 ${this.searchValue}，索引为 ${index}`, true)
            this.progress = 100
            this.isSearching = false
          } else {
            this.showResult(`检查 arr[${index}]=${this.array[index]}，未找到`, false)
            index++
          }

          this.progress = Math.round((index / this.array.length) * 100)
        } else {
          clearInterval(this.currentInterval)
          this.showResult(`未找到目标值 ${this.searchValue}`, false)
          this.progress = 100
          this.isSearching = false
        }
      }, intervalTime)
    },

    hashSearchVisualization(intervalTime) {
      const HASH_MOD = 10
      const hashKey = this.searchValue % HASH_MOD
      const bucket = this.hashTable[hashKey]

      if (!bucket || bucket.length === 0) {
        this.showResult(`哈希表中没有键 ${hashKey}，未找到目标值`, false)
        this.isSearching = false
        return
      }

      let idx = 0

      this.currentInterval = setInterval(() => {
        if (idx < bucket.length) {
          const item = bucket[idx]
          this.hashHighlightIndex = item.index
          this.currentHighlightedIndices = [item.index]

          if (item.value === this.searchValue) {
            clearInterval(this.currentInterval)
            this.foundIndex = item.index
            this.showResult(`找到目标值 ${this.searchValue}，索引为 ${item.index}`, true)
            this.progress = 100
            this.isSearching = false
          } else {
            this.showResult(`检查哈希桶 ${hashKey} 中的值 ${item.value}，未找到`, false)
            idx++
          }

          this.progress = Math.round((idx / bucket.length) * 100)
        } else {
          clearInterval(this.currentInterval)
          this.showResult(`在哈希表中未找到目标值 ${this.searchValue}`, false)
          this.progress = 100
          this.isSearching = false
        }
      }, intervalTime)
    },

    stopSearch() {
      if (this.currentInterval) {
        clearInterval(this.currentInterval)
        this.currentInterval = null
      }
    },

    onAlgorithmChange() {
      this.resetState()
      this.createHashTable()
      this.resultMessage = '算法已切换，请点击"开始搜索"'
      this.resultClass = ''
    },

    onSpeedChange() {
      if (this.isSearching) {
        this.stopSearch()
        this.startSearch()
      }
    },

    showResult(message, found) {
      this.resultMessage = message
      this.resultClass = found ? 'result-found' : 'result-not-found'
    },

    getElementClass(index) {
      const classes = []

      if (this.foundIndex === index) {
        classes.push('found')
      } else if (this.currentHighlightedIndices.includes(index)) {
        classes.push('active', 'pulse')
      } else if (this.visitedIndices.includes(index)) {
        classes.push('visited')
      } else if (this.searchInterval.includes(index)) {
        classes.push('search-interval')
      }

      return classes.join(' ')
    },

    getHashElementClass(originalIndex) {
      const classes = []

      if (this.foundIndex === originalIndex) {
        classes.push('found')
      } else if (this.hashHighlightIndex === originalIndex) {
        classes.push('hash-highlight', 'pulse')
      }

      return classes.join(' ')
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

.algorithm-header {
  padding: 3rem 5%;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.algorithm-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.algorithm-header p {
  font-size: 1.2rem;
  opacity: 0.95;
}

.algorithm-visualization {
  padding: 2rem 5%;
  max-width: 1600px;
  margin: 0 auto;
}

.search-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
}

.search-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.visualization-controls {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.search-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-input input {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
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
  flex: 1;
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

.speed-control,
.size-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.speed-control input[type="range"],
.size-control input[type="range"] {
  width: 100%;
}

.algorithm-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-panel {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.info-panel h3 {
  font-size: 1.2rem;
  color: #16202b;
  margin-bottom: 1rem;
}

.info-panel h4 {
  font-size: 1.1rem;
  color: #16202b;
  margin-bottom: 0.5rem;
}

.info-panel p {
  color: #495057;
  line-height: 1.6;
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

.search-main {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.visualization-container {
  position: relative;
}

.progress-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(to right, #007bff, #0056b3);
  transition: width 0.3s ease;
  border-radius: 2px;
  z-index: 10;
}

.array-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  min-height: 200px;
  align-items: flex-end;
}

.array-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  padding: 0.8rem 0.5rem;
  background: linear-gradient(to top, #007bff, #0056b3);
  color: white;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.array-element .array-value {
  margin-bottom: 0.3rem;
}

.array-element .array-index {
  font-size: 0.7rem;
  opacity: 0.7;
}

.array-element.active {
  background: linear-gradient(to top, #ffc107, #ff9800);
  transform: scale(1.15);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.5);
}

.array-element.visited {
  background: linear-gradient(to top, #6c757d, #5a6268);
}

.array-element.found {
  background: linear-gradient(to top, #28a745, #218838);
  transform: scale(1.2);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.5);
  animation: pulse 0.5s ease-in-out infinite;
}

.array-element.search-interval {
  opacity: 0.5;
}

.array-element.pulse {
  animation: pulse 0.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
}

.hash-table {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.hash-bucket {
  background: #ffffff;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 1rem;
  min-width: 100px;
}

.hash-bucket-label {
  font-weight: 700;
  color: #007bff;
  margin-bottom: 0.5rem;
  text-align: center;
  padding: 0.3rem;
  background: #e7f3ff;
  border-radius: 4px;
}

.hash-bucket-elements {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hash-element {
  min-width: 60px;
  font-size: 0.85rem;
}

.hash-element.hash-highlight {
  background: linear-gradient(to top, #ffc107, #ff9800);
  transform: scale(1.1);
}

.search-result {
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
}

.search-result.result-found {
  background: linear-gradient(135deg, #28a745, #218838);
  color: #ffffff;
  animation: result-pop 0.5s;
}

.search-result.result-not-found {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: #ffffff;
}

@keyframes result-pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
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

@media (max-width: 1024px) {
  .search-layout {
    grid-template-columns: 1fr;
  }

  .search-sidebar {
    order: 2;
  }

  .search-main {
    order: 1;
  }

  .algorithm-header h1 {
    font-size: 2rem;
  }

  .array-element {
    min-width: 40px;
    padding: 0.6rem 0.4rem;
    font-size: 0.8rem;
  }
}
</style>
