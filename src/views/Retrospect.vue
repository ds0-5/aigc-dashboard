<template>
  <div class="page">
    <h2>🔍 深度复盘</h2>

    <!-- 项目选择器 -->
    <div class="project-selector">
      <button 
        v-for="p in store.projects" 
        :key="p.id"
        :class="['selector-btn', { active: store.currentProjectId === p.id }]"
        @click="store.setCurrentProject(p.id)"
      >
        {{ p.name }}
      </button>
    </div>

    <!-- 如果没有项目数据，不渲染 -->
    <div v-if="store.currentProject" class="retro-layout" id="retro-export-area">
      
      <!-- 左侧：流程时间线 -->
      <div class="retro-section">
        <h3>📌 项目流程拆解</h3>
        <div class="project-subtitle">{{ store.currentProject.name }} · ¥{{ store.currentProject.amount }}</div>
        
        <div 
          v-for="(item, index) in store.currentProject.timeline" 
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h4>{{ item.step }}</h4>
              <span class="timeline-time">{{ item.time }}</span>
            </div>
            <p>{{ item.detail }}</p>
          </div>
        </div>
      </div>

      <!-- 右侧：挑战 + 耗时图表 -->
      <div class="retro-right">
        <!-- 挑战与解决方案 -->
        <div class="retro-section">
          <h3>💡 挑战与解决方案</h3>
          <div 
            v-for="(item, index) in store.currentProject.challenges" 
            :key="index"
            class="challenge-card"
          >
            <div class="problem">⚠️ {{ item.problem }}</div>
            <div class="solution">✅ {{ item.solution }}</div>
          </div>
        </div>

        <!-- 各环节耗时图表 -->
        <div class="retro-section">
          <h3>⏱ 各环节耗时分析</h3>
          <div ref="pieChartRef" class="chart-box"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useProjectStore } from '../stores/project'
import * as echarts from 'echarts'

const store = useProjectStore()

// 饼图相关
const pieChartRef = ref(null)
let pieChartInstance = null

function renderPieChart() {
  if (!pieChartRef.value || !store.currentProject) return
  
  // 先销毁旧图表
  if (pieChartInstance) {
    pieChartInstance.dispose()
  }
  
  pieChartInstance = echarts.init(pieChartRef.value)
  
  const option = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['50%', '50%'],
      itemStyle: { 
        borderRadius: 6, 
        borderColor: '#1a1a2e', 
        borderWidth: 3 
      },
      label: { 
        color: '#aaa', 
        fontSize: 11,
        formatter: '{b}\n{d}%'
      },
      data: store.currentProject.timeline.map(t => ({
        name: t.step,
        value: parseFloat(t.time) || 0.5
      }))
    }],
    color: ['#a78bfa', '#60a5fa', '#f59e0b', '#34d399', '#f87171']
  }
  
  pieChartInstance.setOption(option)
}

// 监听当前项目变化，重新渲染图表
watch(() => store.currentProjectId, () => {
  nextTick(() => {
    renderPieChart()
  })
})

// 初始渲染
onMounted(() => {
  nextTick(() => {
    renderPieChart()
  })
})

// 窗口大小变化时图表自适应
window.addEventListener('resize', () => {
  pieChartInstance?.resize()
})
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
}

h2 {
  color: #a78bfa;
  margin-bottom: 20px;
  font-size: 1.5em;
}

/* 项目选择器 */
.project-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.selector-btn {
  padding: 8px 18px;
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  border-radius: 20px;
  color: #aaa;
  cursor: pointer;
  font-size: 0.85em;
  transition: all 0.2s;
}

.selector-btn:hover {
  border-color: #a78bfa;
  color: #fff;
}

.selector-btn.active {
  background: rgba(167,139,250,0.2);
  border-color: #a78bfa;
  color: #a78bfa;
}

/* 左右布局 */
.retro-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.retro-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 共用区块样式 */
.retro-section {
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  border-radius: 16px;
  padding: 24px;
}

.retro-section h3 {
  color: #a78bfa;
  margin-bottom: 16px;
  font-size: 1em;
}

.project-subtitle {
  color: #f59e0b;
  font-size: 0.85em;
  margin-bottom: 20px;
}

/* 时间线 */
.timeline-item {
  position: relative;
  padding-left: 28px;
  margin-bottom: 20px;
  border-left: 2px solid #2a2a4a;
  padding-bottom: 8px;
}

.timeline-item:last-child {
  border-left: 2px solid transparent;
}

.timeline-dot {
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  background: #a78bfa;
  border-radius: 50%;
  border: 2px solid #1a1a2e;
}

.timeline-content h4 {
  font-size: 0.95em;
  color: #fff;
  margin-bottom: 4px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.timeline-time {
  font-size: 0.75em;
  color: #888;
  background: #2a2a4a;
  padding: 2px 10px;
  border-radius: 10px;
}

.timeline-content p {
  font-size: 0.82em;
  color: #aaa;
  line-height: 1.5;
}

/* 挑战卡片 */
.challenge-card {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
}

.challenge-card:last-child {
  margin-bottom: 0;
}

.problem {
  color: #f87171;
  font-weight: 600;
  font-size: 0.88em;
  margin-bottom: 6px;
}

.solution {
  color: #4ade80;
  font-size: 0.82em;
  line-height: 1.4;
}

/* 图表容器 */
.chart-box {
  width: 100%;
  height: 280px;
}

@media (max-width: 768px) {
  .retro-layout {
    grid-template-columns: 1fr;
  }
}
</style>