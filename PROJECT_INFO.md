# 算法可视化平台 Vue 项目

## 项目概述

本项目是一个基于 Vue 3 的算法可视化教育平台，将原 HTML/CSS/JS 项目成功转换为 Vue 单文件组件（SFC）架构。

## 主要功能

### 1. 首页 (AlgorithmPlatform.vue)
- 响应式导航栏
- 英雄横幅区域
- 算法分类卡片展示（支持路由导航）
- 平台特点介绍
- 响应式页脚

### 2. 排序算法可视化 (SortingVisualization.vue)
**支持的算法：**
- 冒泡排序
- 快速排序
- 归并排序
- 插入排序
- 选择排序

**功能特性：**
- 动态数组生成
- 可调节可视化速度
- 步骤控制（下一步/上一步/自动播放）
- 实时统计（比较次数、交换次数、运行时间）
- 算法详情展示（概述、时间复杂度、空间复杂度、应用场景）
- 代码实现展示

### 3. 搜索算法可视化 (SearchingVisualization.vue)
**支持的算法：**
- 二分查找
- 线性查找
- 哈希查找

**功能特性：**
- 动态数组生成
- 搜索目标值设置
- 逐步可视化
- 哈希表展示（用于哈希查找）
- 搜索进度指示器
- 算法详细信息和代码实现

### 4. 图算法可视化 (GraphVisualization.vue)
**支持的算法：**
- 深度优先搜索（DFS）
- 广度优先搜索（BFS）
- Dijkstra 最短路径
- Kruskal 最小生成树

**功能特性：**
- 自动生成随机图
- 节点和边的可视化
- 逐步执行和动画效果
- 算法执行状态显示
- 详细的算法说明和代码实现

### 5. 动态规划可视化 (DynamicProgramming.vue)
**支持的问题：**
- 斐波那契数列
- 0-1背包问题
- 最长公共子序列（LCS）
- 零钱兑换问题

**功能特性：**
- DP表动态生成和展示
- 单元格高亮动画
- 可配置的输入参数
- 逐步执行控制
- 算法解析和代码实现

## 技术栈

- **前端框架：** Vue 3 (Composition API)
- **路由管理：** Vue Router 4
- **构建工具：** Vue CLI 5
- **样式：** Scoped CSS + 原生 CSS
- **图标：** Font Awesome 5

## 项目结构

```
my-vue3-app/
├── src/
│   ├── assets/
│   │   └── images/          # 算法预览图片
│   ├── components/          # Vue 组件
│   │   ├── AlgorithmPlatform.vue    # 首页
│   │   ├── SortingVisualization.vue # 排序算法
│   │   ├── SearchingVisualization.vue # 搜索算法
│   │   ├── GraphVisualization.vue    # 图算法
│   │   └── DynamicProgramming.vue    # 动态规划
│   ├── router/
│   │   └── index.js         # 路由配置
│   ├── App.vue              # 根组件
│   └── main.js              # 应用入口
└── package.json
```

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | AlgorithmPlatform | 首页 |
| `/sorting` | SortingVisualization | 排序算法可视化 |
| `/searching` | SearchingVisualization | 搜索算法可视化 |
| `/graph` | GraphVisualization | 图算法可视化 |
| `/dynamic` | DynamicProgramming | 动态规划可视化 |
| `/about` | (内联) | 关于我们页面 |
| `/resources` | (内联) | 学习资源页面 |

## 使用说明

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run serve
```
访问 http://localhost:8080/

### 生产构建
```bash
npm run build
```

## 转换亮点

1. **组件化架构**：将原来的多页面 HTML 转换为独立的 Vue 组件
2. **响应式数据**：使用 Vue 3 Composition API 管理状态
3. **交互式可视化**：完整的动画和步骤控制
4. **路由导航**：使用 Vue Router 实现 SPA 导航
5. **样式隔离**：使用 Scoped CSS 避免样式冲突
6. **代码质量**：遵循 ESLint 规则，无警告无错误

## 注意事项

1. 所有组件使用 `beforeUnmount` 替代 `beforeDestroy`（Vue 3.0+）
2. 路由配置文件路径使用相对路径 `../components/`
3. 图片资源已复制到 `src/assets/images/` 目录
4. HelloWorld.vue 已删除，不再使用
5. 临时文件已清理

## 开发者

- 原项目：Gitee - nodejs-project-setup
- 转换：HTML/CSS/JS → Vue 3 Single File Components
- 日期：2025年

## 许可证

MIT License
