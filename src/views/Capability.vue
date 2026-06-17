<template>
  <div class="page">
    <h2>⚡ 能力沉淀</h2>

    <div class="capability-grid">
      <!-- 左：技能雷达图 -->
      <div class="cap-section">
        <h3>🎯 技能雷达图</h3>
        <div ref="radarChartRef" class="chart-box"></div>
      </div>

      <!-- 右：工具链 -->
      <div class="cap-section">
        <h3>🧰 工具链</h3>
        <div class="tool-wall">
          <div class="tool-item">🎨 豆包、小黄雀</div>
          <div class="tool-item">🎬 即梦、可灵</div>
          <div class="tool-item">✍️ DeepSeek、千问</div>
          <div class="tool-item">📝 Word、Notion（SOP管理）</div>
          <div class="tool-item">✂️ 剪映</div>
          <div class="tool-item">🖼 Photoshop</div>
          <div class="tool-item">🎞 DaVinci Resolve</div>
          <div class="tool-item">📊 Canva</div>
        </div>
      </div>
    </div>

    <!-- SOP流程 -->
    <div class="cap-section sop-section">
      <h3>📐 可复用SOP流程</h3>
      <p class="sop-desc">基于两个商业项目的实战经验，提炼出的通用AIGC商业视频交付流程</p>
      <div class="sop-flow">
        <div class="sop-step">
          <div class="sop-icon">📋</div>
          <div class="sop-step-title">借助AI需求拆解</div>
          <div class="sop-step-detail">客户Brief<br>→ AIGC版真题题干</div>
        </div>
        <div class="sop-arrow">→</div>
        <div class="sop-step">
          <div class="sop-icon">🎞</div>
          <div class="sop-step-title">分镜设计</div>
          <div class="sop-step-detail">基础概要<br>+ 脚本策划</div>
        </div>
        <div class="sop-arrow">→</div>
        <div class="sop-step">
          <div class="sop-icon">🤖</div>
          <div class="sop-step-title">AI试稿+AI反复优化</div>
          <div class="sop-step-detail">提示词编写<br>→ 参数调优</div>
        </div>
        <div class="sop-arrow">→</div>
        <div class="sop-step">
          <div class="sop-icon">✅</div>
          <div class="sop-step-title">审核交付</div>
          <div class="sop-step-detail">客户反馈<br>→ 修改 → 交付</div>
        </div>
        <div class="sop-arrow">→</div>
        <div class="sop-step">
          <div class="sop-icon">📊</div>
          <div class="sop-step-title">复盘沉淀</div>
          <div class="sop-step-detail">回忆耗时/难点等价值点<br>→ 经验入库</div>
        </div>
      </div>
    </div>

    <!-- 接单心得 -->
    <div class="cap-section">
      <h3>💬 接单心得</h3>
      <div class="insight-cards">
        <div class="insight-card">
          <div class="insight-title">💰 效率问题</div>
          <p>形成自己的SOP流程，提高工作效率。</p>
        </div>
        <div class="insight-card">
          <div class="insight-title">🔄 修改管控</div>
          <p>建立修改流程和标准，控制修改范围和成本。</p>
        </div>
        <div class="insight-card">
          <div class="insight-title">📁 素材复用</div>
          <p>建立个人提示词库和风格模板素材库，同类需求可以在参考中找到灵感，思考程度容易更深。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const radarChartRef = ref(null)
let radarChartInstance = null

function renderRadarChart() {
  if (!radarChartRef.value) return
  
  radarChartInstance = echarts.init(radarChartRef.value)
  
  const option = {
    radar: {
      center: ['50%', '50%'],
      radius: '70%',
      indicator: [
        { name: '对AIGC兴趣浓厚', max: 100 },
        { name: '需求转化', max: 100 },
        { name: '提示词工程', max: 100 },
        { name: '分镜设计', max: 100 },
        { name: '后期剪辑', max: 100 },
        { name: '客户沟通', max: 100 }
      ],
      axisName: { 
        color: '#aaa', 
        fontSize: 11,
        padding: [0, 0]
      },
      splitArea: { 
        areaStyle: { 
          color: ['rgba(167,139,250,0.03)', 'rgba(96,165,250,0.03)'] 
        } 
      },
      splitLine: { lineStyle: { color: '#2a2a4a' } },
      axisLine: { lineStyle: { color: '#2a2a4a' } }
    },
    series: [{
      type: 'radar',
      data: [{ 
        value: [80, 75, 90, 60, 60, 50], 
        name: '技能值',
        areaStyle: { color: 'rgba(167,139,250,0.25)' },
        itemStyle: { color: '#a78bfa' },
        lineStyle: { color: '#a78bfa', width: 2 }
      }]
    }]
  }
  
  radarChartInstance.setOption(option)
}

function handleResize() {
  radarChartInstance?.resize()
}

onMounted(() => {
  renderRadarChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  radarChartInstance?.dispose()
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
  margin-bottom: 24px;
  font-size: 1.5em;
}

/* 网格布局 */
.capability-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

/* 区块样式 */
.cap-section {
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.cap-section h3 {
  color: #a78bfa;
  margin-bottom: 16px;
  font-size: 1em;
}

/* 图表容器 */
.chart-box {
  width: 100%;
  height: 350px;
}

/* 工具墙 */
.tool-wall {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-item {
  background: #2a2a4a;
  padding: 10px 16px;
  border-radius: 25px;
  font-size: 0.85em;
  color: #ccc;
  transition: all 0.2s;
}

.tool-item:hover {
  background: #3a3a5a;
  color: #fff;
}

/* SOP流程 */
.sop-desc {
  color: #888;
  font-size: 0.85em;
  margin-bottom: 20px;
}

.sop-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.sop-step {
  flex: 1;
  min-width: 120px;
  background: #2a2a4a;
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s;
}

.sop-step:hover {
  background: #3a3a5a;
  transform: translateY(-2px);
}

.sop-icon {
  font-size: 1.8em;
  margin-bottom: 8px;
}

.sop-step-title {
  font-size: 0.85em;
  color: #a78bfa;
  font-weight: 600;
  margin-bottom: 6px;
}

.sop-step-detail {
  font-size: 0.7em;
  color: #888;
  line-height: 1.5;
}

.sop-arrow {
  color: #a78bfa;
  font-size: 1.2em;
  font-weight: bold;
}

/* 心得卡片 */
.insight-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.insight-card {
  background: #2a2a4a;
  border-radius: 10px;
  padding: 16px;
}

.insight-title {
  color: #f59e0b;
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 8px;
}

.insight-card p {
  color: #aaa;
  font-size: 0.8em;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .capability-grid {
    grid-template-columns: 1fr;
  }
  .sop-flow {
    flex-direction: column;
  }
  .sop-arrow {
    transform: rotate(90deg);
  }
  .insight-cards {
    grid-template-columns: 1fr;
  }
}
</style>