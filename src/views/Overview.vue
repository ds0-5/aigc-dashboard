<template>
  <div class="page">
    <h2>📋 项目全景</h2>
    
    <!-- 数据总览卡片 -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-value">¥{{ store.totalAmount }}</div>
        <div class="summary-label">累计接单金额</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">{{ store.projectCount }}</div>
        <div class="summary-label">交付项目数</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">100%</div>
        <div class="summary-label">客户满意度</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">4.5天</div>
        <div class="summary-label">平均交付周期</div>
      </div>
    </div>

    <!-- 项目卡片网格 -->
    <div class="card-grid">
      <div 
        v-for="project in store.projects" 
        :key="project.id"
        class="project-card"
        @click="goToRetrospect(project.id)"
      >
        <h3>{{ project.name }}</h3>
        <div class="project-meta">
          <span class="amount">¥{{ project.amount }}</span>
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <p class="desc">{{ project.description }}</p>
        
        <!-- SOP覆盖率进度条 -->
        <div class="sop-bar">
          <div class="sop-bar-label">
            <span>SOP覆盖率</span>
            <span>{{ project.sopProgress }}%</span>
          </div>
          <div class="sop-bar-track">
            <div class="sop-bar-fill" :style="{ width: project.sopProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project'

const store = useProjectStore()
const router = useRouter()

function goToRetrospect(id) {
  store.setCurrentProject(id)
  router.push('/retrospect')
}
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

/* 数据总览 */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.summary-card {
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.summary-value {
  font-size: 1.8em;
  font-weight: 700;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}

.summary-label {
  font-size: 0.8em;
  color: #888;
}

/* 项目卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.project-card {
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.project-card:hover {
  border-color: #a78bfa;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(167,139,250,0.1);
}

.project-card h3 {
  font-size: 1.1em;
  margin-bottom: 12px;
  color: #fff;
}

.project-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.amount {
  color: #f59e0b;
  font-weight: 600;
  font-size: 0.9em;
}

.tag {
  background: rgba(167,139,250,0.15);
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75em;
  color: #a78bfa;
}

.desc {
  font-size: 0.85em;
  color: #aaa;
  margin-bottom: 16px;
  line-height: 1.5;
}

/* SOP进度条 */
.sop-bar {
  margin-top: 8px;
}

.sop-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.78em;
  color: #888;
  margin-bottom: 6px;
}

.sop-bar-track {
  height: 6px;
  background: #2a2a4a;
  border-radius: 3px;
  overflow: hidden;
}

.sop-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  border-radius: 3px;
  transition: width 0.6s;
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>