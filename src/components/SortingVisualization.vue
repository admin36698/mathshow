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
          <h1>排序算法可视化</h1>
          <p>观察各种排序算法的工作过程，理解它们的原理和性能特点</p>
        </section>

        <section class="algorithm-visualization">
          <div class="visualization-controls">
            <div class="algorithm-selector">
              <label for="algo-select">选择排序算法：</label>
              <select v-model="selectedAlgorithm" id="algo-select" @change="onAlgorithmChange">
                <option value="bubble">冒泡排序</option>
                <option value="quick">快速排序</option>
                <option value="merge">归并排序</option>
                <option value="insertion">插入排序</option>
                <option value="selection">选择排序</option>
              </select>
            </div>

            <div class="control-buttons">
              <button class="btn" @click="generateNewArray" :disabled="isRunning">生成新数组</button>
              <button class="btn btn-primary" @click="startSorting" :disabled="isRunning">开始排序</button>
              <button class="btn" @click="pauseSorting" :disabled="!isRunning">暂停</button>
              <button class="btn" @click="resetVisualization" :disabled="isRunning">重置</button>
            </div>

            <div class="speed-control">
              <label for="speed-slider">速度：</label>
              <input type="range" v-model="speed" id="speed-slider" min="1" max="10" value="5" @input="onSpeedChange">
            </div>

            <div class="size-control">
              <label for="size-slider">数组大小：</label>
              <input type="range" v-model="arraySize" id="size-slider" min="10" max="100" value="30" @input="generateNewArray">
            </div>
          </div>

          <div class="visualization-container">
            <div class="status-indicator">
              <div class="status-item">
                <span class="status-label">当前算法:</span>
                <span class="status-value">{{ currentAlgorithmName }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">已比较次数:</span>
                <span class="status-value">{{ comparisonCount }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">已交换次数:</span>
                <span class="status-value">{{ swapCount }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">已用时间:</span>
                <span class="status-value">{{ elapsedTime.toFixed(2) }}s</span>
              </div>
            </div>

            <div class="array-container">
              <div
                v-for="(value, index) in array"
                :key="index"
                class="array-element"
                :class="getElementClass(index)"
                :style="getElementStyle(value)"
              >
                {{ value }}
              </div>
            </div>

            <div class="step-controller">
              <div class="step-buttons">
                <button class="btn" @click="prevStep" :disabled="currentStepIndex <= 0 || isRunning">
                  <i class="fas fa-step-backward"></i> 上一步
                </button>
                <button class="btn" @click="nextStep" :disabled="currentStepIndex >= steps.length - 1 || isRunning">
                  <i class="fas fa-step-forward"></i> 下一步
                </button>
                <button class="btn" @click="autoPlay" :disabled="currentStepIndex >= steps.length - 1 || isRunning">
                  <i class="fas fa-play"></i> 自动播放
                </button>
              </div>
              <div class="step-description">
                <p>{{ stepDescription }}</p>
              </div>
            </div>

            <div class="algorithm-info">
              <div class="info-panel">
                <h3>算法解析 <i class="fas fa-info-circle" title="点击展开或折叠详情"></i></h3>
                <div class="collapsible-content">
                  <div class="algorithm-tabs">
                    <button
                      class="tab-btn"
                      :class="{ active: activeTab === 'overview' }"
                      @click="activeTab = 'overview'"
                    >概述</button>
                    <button
                      class="tab-btn"
                      :class="{ active: activeTab === 'complexity' }"
                      @click="activeTab = 'complexity'"
                    >复杂度</button>
                    <button
                      class="tab-btn"
                      :class="{ active: activeTab === 'applications' }"
                      @click="activeTab = 'applications'"
                    >应用场景</button>
                  </div>
                  <div class="tab-content" v-show="activeTab === 'overview'" id="overview">
                    <h4>{{ currentAlgorithmName }}</h4>
                    <p>{{ algorithmInfo[currentAlgorithmKey]?.description || '' }}</p>
                  </div>
                  <div class="tab-content" v-show="activeTab === 'complexity'" id="complexity">
                    <p><strong>时间复杂度：</strong></p>
                    <ul>
                      <li>最坏情况：{{ algorithmInfo[currentAlgorithmKey]?.worstCase || 'N/A' }}</li>
                      <li>平均情况：{{ algorithmInfo[currentAlgorithmKey]?.averageCase || 'N/A' }}</li>
                      <li>最好情况：{{ algorithmInfo[currentAlgorithmKey]?.bestCase || 'N/A' }}</li>
                    </ul>
                    <p><strong>空间复杂度：</strong> {{ algorithmInfo[currentAlgorithmKey]?.spaceComplexity || 'N/A' }}</p>
                  </div>
                  <div class="tab-content" v-show="activeTab === 'applications'" id="applications">
                    <p>{{ algorithmInfo[currentAlgorithmKey]?.applications || '' }}</p>
                  </div>
                </div>
              </div>

              <div class="info-panel">
                <h3>代码实现 <i class="fas fa-code" title="点击展开或折叠代码"></i></h3>
                <pre class="collapsible-content">{{ algorithmInfo[currentAlgorithmKey]?.code || '' }}</pre>
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
  name: 'SortingVisualization',
  data() {
    return {
      array: [],
      selectedAlgorithm: 'bubble',
      speed: 5,
      arraySize: 30,
      isRunning: false,
      isPaused: false,
      comparisonCount: 0,
      swapCount: 0,
      startTime: null,
      elapsedTime: 0,
      timer: null,
      currentStepIndex: 0,
      steps: [],
      stepDescription: '选择一个排序算法并点击"开始排序"或"下一步"按钮开始可视化过程。',
      activeTab: 'overview',
      currentComparingIndices: [],
      currentSwappingIndices: [],
      currentSortedIndices: [],
      algorithmInfo: {
        bubble: {
          name: '冒泡排序',
          description: '冒泡排序是一种简单的排序算法，它重复地遍历要排序的数组，一次比较两个元素，如果顺序错误就交换它们。遍历数组的工作不断重复进行，直到没有再需要交换的元素，也就是说该数组已经排序完成。',
          worstCase: 'O(n²)',
          averageCase: 'O(n²)',
          bestCase: 'O(n)',
          spaceComplexity: 'O(1)',
          applications: '冒泡排序适用于：\n- 教学演示\n- 数据量较小的情况\n- 几乎已排序的数据',
          code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // 比较相邻元素
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
        },
        quick: {
          name: '快速排序',
          description: '快速排序是一种分治策略的排序算法。它选择一个元素作为"基准"，将数组分为两部分：一部分比基准小，另一部分比基准大，然后递归地对这两部分进行排序。',
          worstCase: 'O(n²)',
          averageCase: 'O(n log n)',
          bestCase: 'O(n log n)',
          spaceComplexity: 'O(log n)',
          applications: '快速排序适用于：\n- 大规模数据排序\n- 通用排序场景\n- 需要平均性能优秀的场景',
          code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`
        },
        merge: {
          name: '归并排序',
          description: '归并排序是一种分治策略的排序算法。它将数组分成两半，分别排序后再合并。其时间复杂度恒定为 O(n log n)，但需要额外的 O(n) 空间。',
          worstCase: 'O(n log n)',
          averageCase: 'O(n log n)',
          bestCase: 'O(n log n)',
          spaceComplexity: 'O(n)',
          applications: '归并排序适用于：\n- 需要稳定排序的场合\n- 链表排序\n- 外排序（大数据）',
          code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}`
        },
        insertion: {
          name: '插入排序',
          description: '插入排序的工作方式类似于整理扑克牌。它将数组分为已排序和未排序两部分，每次从未排序部分取出一个元素，在已排序部分找到合适的位置插入。',
          worstCase: 'O(n²)',
          averageCase: 'O(n²)',
          bestCase: 'O(n)',
          spaceComplexity: 'O(1)',
          applications: '插入排序适用于：\n- 小规模数据\n- 基本有序的数据\n- 在线排序（数据持续到达）',
          code: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`
        },
        selection: {
          name: '选择排序',
          description: '选择排序的工作方式是：每次从待排序部分选择最小（或最大）的元素，放在已排序部分的末尾。简单直观，但效率较低。',
          worstCase: 'O(n²)',
          averageCase: 'O(n²)',
          bestCase: 'O(n²)',
          spaceComplexity: 'O(1)',
          applications: '选择排序适用于：\n- 教学演示\n- 内存受限的场景\n- 交换成本较低的情况',
          code: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
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
    this.stopTimer()
  },
  methods: {
    generateNewArray() {
      if (this.isRunning) return

      this.array = []
      for (let i = 0; i < this.arraySize; i++) {
        this.array.push(Math.floor(Math.random() * 100) + 1)
      }

      this.resetStats()
      this.steps = []
      this.currentStepIndex = 0
      this.stepDescription = '数组已生成，点击"开始排序"或"下一步"开始可视化。'
    },

    resetStats() {
      this.comparisonCount = 0
      this.swapCount = 0
      this.elapsedTime = 0
      this.startTime = null
      this.currentComparingIndices = []
      this.currentSwappingIndices = []
      this.currentSortedIndices = []
    },

    resetVisualization() {
      this.stopTimer()
      this.isRunning = false
      this.isPaused = false
      this.generateNewArray()
    },

    startSorting() {
      if (this.isRunning) return

      this.isRunning = true
      this.isPaused = false
      this.startTime = Date.now()

      if (this.steps.length === 0) {
        this.recordSteps()
      }

      this.currentStepIndex = 0
      this.autoPlay()
    },

    pauseSorting() {
      if (!this.isRunning) return
      this.isPaused = !this.isPaused
      if (this.isPaused) {
        this.stopTimer()
      } else {
        this.autoPlay()
      }
    },

    recordSteps() {
      const arr = [...this.array]
      this.steps = []

      switch (this.selectedAlgorithm) {
        case 'bubble':
          this.recordBubbleSortSteps(arr)
          break
        case 'selection':
          this.recordSelectionSortSteps(arr)
          break
        case 'insertion':
          this.recordInsertionSortSteps(arr)
          break
        case 'quick':
          this.recordQuickSortSteps(arr, 0, arr.length - 1)
          break
        case 'merge':
          this.recordMergeSortSteps(arr, 0, arr.length - 1)
          break
      }

      // 标记所有元素为已排序
      this.steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: arr.length }, (_, i) => i),
        description: '排序完成！'
      })
    },

    recordBubbleSortSteps(arr) {
      const n = arr.length
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          this.steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            description: `比较 arr[${j}]=${arr[j]} 和 arr[${j + 1}]=${arr[j + 1]}`
          })

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            this.steps.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
              description: `交换 ${arr[j + 1]} 和 ${arr[j]}`
            })
          }
        }
      }
    },

    recordSelectionSortSteps(arr) {
      const n = arr.length
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i
        for (let j = i + 1; j < n; j++) {
          this.steps.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
            description: `查找最小值：比较 arr[${minIdx}]=${arr[minIdx]} 和 arr[${j}]=${arr[j]}`
          })

          if (arr[j] < arr[minIdx]) {
            minIdx = j
          }
        }

        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
          this.steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: Array.from({ length: i }, (_, k) => k),
            description: `将最小值 ${arr[i]} 放到位置 ${i}`
          })
        }
      }
    },

    recordInsertionSortSteps(arr) {
      const n = arr.length
      for (let i = 1; i < n; i++) {
        const key = arr[i]
        let j = i - 1

        this.steps.push({
          array: [...arr],
          comparing: [i],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
          description: `将 ${key} 插入到已排序部分`
        })

        while (j >= 0 && arr[j] > key) {
          this.steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
            description: `比较 arr[${j}]=${arr[j]} 和 ${key}`
          })

          arr[j + 1] = arr[j]
          this.steps.push({
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => k),
            description: `移动 arr[${j}]=${arr[j]} 到位置 ${j + 1}`
          })
          j--
        }
        arr[j + 1] = key
      }
    },

    recordQuickSortSteps(arr, low, high) {
      if (low < high) {
        const pi = this.partition(arr, low, high)
        this.recordQuickSortSteps(arr, low, pi - 1)
        this.recordQuickSortSteps(arr, pi + 1, high)
      }
    },

    partition(arr, low, high) {
      const pivot = arr[high]
      let i = low - 1

      this.steps.push({
        array: [...arr],
        comparing: [high],
        swapping: [],
        sorted: [],
        description: `选择基准值 ${pivot} (位置 ${high})`
      })

      for (let j = low; j < high; j++) {
        this.steps.push({
          array: [...arr],
          comparing: [j, high],
          swapping: [],
          sorted: [],
          description: `比较 arr[${j}]=${arr[j]} 和基准 ${pivot}`
        })

        if (arr[j] < pivot) {
          i++
          [arr[i], arr[j]] = [arr[j], arr[i]]

          if (i !== j) {
            this.steps.push({
              array: [...arr],
              comparing: [],
              swapping: [i, j],
              sorted: [],
              description: `交换 arr[${i}]=${arr[i]} 和 arr[${j}]=${arr[j]}`
            })
          }
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      this.steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i + 1, high],
        sorted: [i + 1],
        description: `将基准放到正确位置 ${i + 1}`
      })

      return i + 1
    },

    recordMergeSortSteps(arr, l, r) {
      if (l < r) {
        const m = Math.floor((l + r) / 2)

        this.recordMergeSortSteps(arr, l, m)
        this.recordMergeSortSteps(arr, m + 1, r)

        this.merge(arr, l, m, r)
      }
    },

    merge(arr, l, m, r) {
      const left = arr.slice(l, m + 1)
      const right = arr.slice(m + 1, r + 1)

      let i = 0, j = 0, k = l

      this.steps.push({
        array: [...arr],
        comparing: [],
        swapping: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
        sorted: Array.from({ length: l }, (_, idx) => idx),
        description: `合并区间 [${l}, ${m}] 和 [${m + 1}, ${r}]`
      })

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          arr[k] = left[i]
          i++
        } else {
          arr[k] = right[j]
          j++
        }
        k++
      }

      while (i < left.length) {
        arr[k] = left[i]
        i++
        k++
      }

      while (j < right.length) {
        arr[k] = right[j]
        j++
        k++
      }

      this.steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: r + 1 }, (_, idx) => idx),
        description: '合并完成'
      })
    },

    nextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++
        this.applyStep(this.steps[this.currentStepIndex])
      }
    },

    prevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
        this.applyStep(this.steps[this.currentStepIndex])
      }
    },

    applyStep(step) {
      this.array = [...step.array]
      this.currentComparingIndices = step.comparing || []
      this.currentSwappingIndices = step.swapping || []
      this.currentSortedIndices = step.sorted || []
      this.stepDescription = step.description

      this.elapsedTime = (Date.now() - this.startTime) / 1000
      this.comparisonCount = step.comparing ? this.comparisonCount + 1 : this.comparisonCount
      this.swapCount = step.swapping ? this.swapCount + 1 : this.swapCount
    },

    autoPlay() {
      if (this.currentStepIndex >= this.steps.length - 1) {
        this.isRunning = false
        return
      }

      const intervalTime = 1000 / this.speed

      this.timer = setInterval(() => {
        if (this.isPaused) return

        if (this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex++
          this.applyStep(this.steps[this.currentStepIndex])
        } else {
          this.stopTimer()
          this.isRunning = false
        }
      }, intervalTime)
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    onAlgorithmChange() {
      if (!this.isRunning) {
        this.steps = []
        this.currentStepIndex = 0
        this.stepDescription = '算法已切换，点击"开始排序"重新生成步骤。'
      }
    },

    onSpeedChange() {
      if (this.isRunning && !this.isPaused) {
        this.stopTimer()
        this.autoPlay()
      }
    },

    getElementClass(index) {
      const classes = []

      if (this.currentComparingIndices.includes(index)) {
        classes.push('comparing')
      }

      if (this.currentSwappingIndices.includes(index)) {
        classes.push('swapping')
      }

      if (this.currentSortedIndices.includes(index)) {
        classes.push('sorted')
      }

      return classes.join(' ')
    },

    getElementStyle(value) {
      const maxValue = 100
      const height = (value / maxValue) * 100
      return {
        height: `${height}%`
      }
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

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

/* 页面标题 */
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

/* 可视化区域 */
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
  align-items: center;
}

.algorithm-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.algorithm-selector select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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

.speed-control,
.size-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.speed-control input[type="range"],
.size-control input[type="range"] {
  width: 120px;
}

/* 状态指示器 */
.status-indicator {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.status-item {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.status-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #16202b;
}

/* 数组容器 */
.array-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
  height: 400px;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.array-element {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 30px;
  background: linear-gradient(to top, #007bff, #0056b3);
  color: white;
  border-radius: 4px 4px 0 0;
  font-size: 0.7rem;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 20px;
}

.array-element.comparing {
  background: linear-gradient(to top, #ffc107, #ff9800);
  transform: scaleY(1.05);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.array-element.swapping {
  background: linear-gradient(to top, #dc3545, #c82333);
  transform: scaleY(1.1);
  box-shadow: 0 0 15px rgba(220, 53, 69, 0.5);
}

.array-element.sorted {
  background: linear-gradient(to top, #28a745, #218838);
}

/* 步骤控制器 */
.step-controller {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.step-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.step-description {
  padding: 1rem;
  background: #ffffff;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.step-description p {
  color: #495057;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 算法信息 */
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-panel h4 {
  font-size: 1.1rem;
  color: #16202b;
  margin-bottom: 0.5rem;
}

.info-panel p {
  color: #495057;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.info-panel ul {
  margin-left: 1.5rem;
  color: #495057;
  line-height: 2;
}

.info-panel pre {
  background: #2c3e50;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.algorithm-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #e9ecef;
  color: #495057;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #007bff;
  color: #ffffff;
}

.tab-btn:hover:not(.active) {
  background: #dee2e6;
}

/* 页脚 */
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

/* 响应式设计 */
@media (max-width: 768px) {
  .visualization-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .algorithm-info {
    grid-template-columns: 1fr;
  }

  .array-container {
    height: 300px;
  }

  .array-element {
    width: 20px;
    font-size: 0.6rem;
  }

  .status-indicator {
    flex-direction: column;
  }
}
</style>
