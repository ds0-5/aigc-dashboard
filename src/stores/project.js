import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectStore = defineStore('project', () => {
  // ========== 所有项目数据 ==========
  const projects = ref([
    {
      id: 1,
      name: '智能家居产品AI宣传短片',
      amount: 200,
      tags: ['AI视频', '产品宣传', 'Runway'],
      description: '为客户新品智能灯带制作30秒AI宣传片，包含未来感城市场景切换。',
      sopProgress: 90,
      challenges: [
        { problem: '人物与场景风格不统一', solution: '建立统一的风格提示词模板，固定seed值保证一致性' },
        { problem: '生成视频闪烁问题', solution: '使用Runway帧插值平滑，后期用DaVinci补帧' },
        { problem: '客户对"未来感"理解偏差', solution: '先出3种风格的分镜草图让客户选择，锁定方向后再批量生成' }
      ],
      timeline: [
        { step: '需求分析', detail: '客户提供产品图及参考视频，沟通确定"赛博朋克+温暖家居"融合风格', time: '0.5天' },
        { step: '分镜脚本', detail: '绘制8个分镜画面，标注镜头运动、时长、提示词方向', time: '1天' },
        { step: 'AI生成', detail: 'Midjourney生成关键帧 → Runway图生视频 → 反复调优提示词', time: '1.5天' },
        { step: '后期剪辑', detail: '剪映合成+配乐+音效+转场，输出初稿', time: '0.5天' },
        { step: '客户审核', detail: '初稿交付→客户反馈修改→最终交付', time: '1天' }
      ]
    },
    {
      id: 2,
      name: '少儿科普漫画分镜设计',
      amount: 110,
      tags: ['AI绘画', '分镜设计', 'Midjourney'],
      description: '为教育类客户制作10页科普漫画分镜，主题为"恐龙灭绝"。',
      sopProgress: 75,
      challenges: [
        { problem: '恐龙形象需符合科学常识', solution: '先用ChatGPT确认恐龙种类特征，再输入MJ生成' },
        { problem: '画面风格需吸引儿童', solution: '测试了3种画风，最终选定扁平可爱风' }
      ],
      timeline: [
        { step: '需求分析', detail: '与老师沟通知识大纲，确定10个核心知识点', time: '0.5天' },
        { step: '分镜脚本', detail: '每页画面内容+文字脚本+参考图', time: '1天' },
        { step: 'AI生成', detail: 'MJ批量生成角色定妆照+场景图', time: '1天' },
        { step: '排版交付', detail: 'Canva排版+标注说明，交付PDF', time: '0.5天' }
      ]
    }
  ])

  // ========== 当前选中的项目ID ==========
  const currentProjectId = ref(1)

  // ========== 计算属性（自动算的） ==========
  // 自动获取当前选中的项目对象
  const currentProject = computed(() => {
    return projects.value.find(p => p.id === currentProjectId.value)
  })

  // 自动计算总金额
  const totalAmount = computed(() => {
    return projects.value.reduce((sum, p) => sum + p.amount, 0)
  })

  // 自动计算项目数量
  const projectCount = computed(() => {
    return projects.value.length
  })

  // ========== 操作方法 ==========
  function setCurrentProject(id) {
    currentProjectId.value = id
  }

  // ========== 导出 ==========
  return {
    projects,
    currentProjectId,
    currentProject,
    totalAmount,
    projectCount,
    setCurrentProject
  }
})