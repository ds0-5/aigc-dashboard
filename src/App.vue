<template>
  <div id="app">
    <!-- Hero区域 -->
    <div class="hero">
      <h1>🚀 AIGC商业交付实践记录</h1>
    </div>
    
    <!-- 导航按钮 -->
    <nav class="tabs">
      <router-link to="/overview" class="tab-btn">📋 项目全景</router-link>
      <router-link to="/retrospect" class="tab-btn">🔍 深度复盘</router-link>
      <router-link to="/capability" class="tab-btn">⚡ 能力沉淀</router-link>
    </nav>

    <!-- 页面内容 -->
    <router-view />

    <!-- 导出按钮（固定在右下角） -->
    <button class="export-btn" @click="handleExport">📥 导出复盘报告</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { exportToPDF } from './utils/exportPDF'

const route = useRoute()

function handleExport() {
  if (route.name === 'retrospect') {
    // 在深度复盘页面，导出整个retro-layout区域
    exportToPDF('retro-export-area', 'AIGC项目复盘报告.pdf')
  } else {
    alert('请先切换到"深度复盘"Tab，再导出报告')
  }
}
</script>

<style>
#app {
  color: white;
  min-height: 100vh;
  position: relative;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 36px 20px;
  text-align: center;
  border-bottom: 1px solid #2a2a4a;
}

.hero h1 {
  font-size: 1.8em;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 导航 */
.tabs {
  display: flex;
  justify-content: center;
  gap: 0;
  background: #1a1a2e;
  border-bottom: 1px solid #2a2a4a;
}

.tab-btn {
  padding: 14px 30px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.95em;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #ccc;
}

.tab-btn.router-link-active {
  color: #a78bfa;
  border-bottom-color: #a78bfa;
}

/* 导出按钮 */
.export-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9em;
  box-shadow: 0 4px 15px rgba(167,139,250,0.4);
  transition: all 0.2s;
  z-index: 100;
}

.export-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(167,139,250,0.6);
}
</style>