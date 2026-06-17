import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectStore = defineStore('project', () => {
  // ========== 所有项目数据 ==========
  const projects = ref([
    {
      id: 1,
      name: '自媒体动漫制作短视频',
      amount: 150,
      tags: ['AI视频', '自媒体宣传'],
      description: '为客户生成自媒体萌物视频。',
      sopProgress: 90,
      challenges: [
        { problem: '生成与参考视频类似的视频，不限制故事内容，但提交上来的视频不能全部都是一个故事模板', solution: '解决办法:相同的画风和基础动作库+不同的角色身份和对应的独立剧情' },
        { problem: '提交时长15秒,比例为竖屏9:16,mp4格式的视频文件,角色必须可爱、萌', solution: '解决办法:让部分角色用简单的词语或短句（如“好吃！”“一起玩！”）正常说话，另一部分角色全程只用“咕咕”“嘎嘎”“呀呀”等萌系拟声词配合表情和动作表达情绪。并且,在格式方面,严格保持9:16竖屏比例,总时长精准15秒。' },
        { problem: '场景集中,不要频繁切换场景', solution: '解决办法:每个视频全程固定在一个主场景，用景别变化(近景/中景/特写)和角色在画面内移动来代替镜头切换。' }
      ],
      timeline: [
        { step: '利用AI规范化项目需求', detail: '客户提供产品图及参考视频，沟通确定"可爱嘟萌Q版"融合风格', time: '0.5小时' },
        { step: '文生图', detail: '1.先确定大致文字，然后到小黄雀上文生图试点。\n2.将多次实验好之后的提示词放到即梦用于分镜制作：标注镜头运动、时长、提示词方向等等。', time: '1小时' },
        { step: '图生片', detail: '1.通过在豆包的试点，反复调估，确定适合的动态化提示词。\n2.回到即梦，导入图片，开始图生视频，评估质量的好坏。', time: '1小时' },
        { step: '后期工作:剪辑、整合、优化', detail: '1.剪映合成 + 配音配乐（配可能的文字） + 配转场\n→输出初稿', time: '1小时' },
        { step: '客户审核', detail: '1.初稿交付→客户反馈修改→最终交付', time: '跟随客户验收时间......' }
      ]
    }, 
    {
      id: 2,
      name: '城市vlog视频定制',
      amount: 160,
      tags: ['AI视频', '城市步行Vlog', '角色城市漫游vlog'],
      description: '以角色（动物或人物）第一人称步行视角，拍摄或制作15秒竖屏城市人文vlog，风格可写实可卡通，重点展示城市风景或文化特色。"。',
      sopProgress: 95,
      challenges: [
        { problem: '主体风格尽量保持一致', solution: '为所有视频锁定同一套美术设定（固定的角色造型、配色板、线条粗细）和运镜逻辑（全程手持微晃动或全程固定机位），不做风格突变。' },
        { problem: '视频不能有明显瑕疵（结构不清晰不合理，边缘模糊）', solution: '渲染输出前强制检查：①分镜逻辑为“开始动作→过程反应→结束状态”三步清晰；②主体角色与背景分层绘制，边缘用锐化滤镜或矢量描边，禁止使用柔边笔刷。' },
        { problem: '动作流程，镜头转场稳定。画面与故事要一致', solution: '每个镜头至少持续1.5秒以上，转场仅用硬切或极慢速位移，且动作起势和落势必须在同一镜头内完成后再切换。' },
      ],
      timeline: [
        { step: '利用AI规范化项目需求', detail: '确定提示词的排版书写', time: '0.5天' },
        { step: '文生图', detail: '1.先确定大致文字，然后到小黄雀上文生图试点。\n2.将多次实验好之后的提示词放到即梦用于分镜制作：标注镜头运动、时长、提示词方向等等。', time: '1天' },
        { step: '图生片', detail: '1.通过在豆包的试点，反复调估，确定适合的动态化提示词。\n2.回到即梦，导入图片，开始图生视频，评估质量的好坏。', time: '1天' },
        { step: '后期工作:剪辑、整合、优化', detail: '1.剪映合成 + 配音配乐（配可能的文字） + 配转场\n→输出初稿', time: '1小时' },
        { step: '客户审核', detail: '1.初稿交付→客户反馈修改→最终交付', time: '跟随客户验收时间......' }
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