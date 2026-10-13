import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// ============================================================
// 站点信息（用户主页仓库 toroad/toroad.github.io）
// 地址：https://toroad.github.io
// 若后续绑定自定义域名：只改 SITE_URL 一处即可，base 保持 '/'
//
//
// ============================================================
const SITE_URL = 'https://toroad.github.io'
const BASE = '/'

export default withMermaid(
  defineConfig({
    base: BASE,
    lang: 'zh-CN',
    title: "Deep Systems",
    description: '网络、安全、Agent 与软件架构的深度技术笔记',

    cleanUrls: true,
    lastUpdated: true,

    sitemap: {
      hostname: SITE_URL + BASE
    },

    head: [
      ['meta', { name: 'author', content: 'jack zhang' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'Deep Systems' }],
      ['meta', { property: 'og:description', content: '网络、安全、Agent 与软件架构的深度技术笔记' }]
    ],

    themeConfig: {
      outline: { level: [2, 3], label: '本页目录' },
      lastUpdated: { text: '最后更新' },
      docFooter: { prev: '上一篇', next: '下一篇' },
      darkModeSwitchLabel: '外观',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部',

      nav: [
        { text: '首页', link: '/' },
        { text: '系列专题', link: '/series/' },
        { text: '随笔文章', link: '/essays/' },
        { text: '专题方向', link: '/#专题方向' },
        {
          text: '当前系列',
          items: [
            { text: '生产级 Agent 平台架构 2026', link: '/series/agent-platform-2026/00-overview' }
          ]
        }
      ],

      // 侧边栏按路径自动匹配：每个系列/目录一组，新增内容在此追加
      sidebar: {
        '/series/agent-platform-2026/': [
          {
            text: '生产级 Agent 平台架构 2026',
            collapsed: false,
            items: [
      { text: '00 从模型推理到生产运行：2026 年 Agent、Harness 与 Runtime 总体架构', link: '/series/agent-platform-2026/00-overview' },
      { text: '01 Agent、Harness 与 Runtime：生产级 Agent 平台的职责边界', link: '/series/agent-platform-2026/01-harness-runtime-boundary' },
      { text: '02 从 Task 到交付：Agent 业务闭环与领域对象设计', link: '/series/agent-platform-2026/02-task-to-delivery' },
      { text: '03 生产级 Agent 平台总体架构：从主链到功能域', link: '/series/agent-platform-2026/03-platform-architecture' },
      { text: '04 Agent Runtime：从生命周期到执行治理的完整能力模型', link: '/series/agent-platform-2026/04-agent-runtime-capability-model' },
      { text: '05 Harness 与 Agent Loop：行为组织、上下文工程与确定性控制', link: '/series/agent-platform-2026/05-harness-agent-loop' },
      { text: '06 持久执行、Checkpoint 与副作用对账', link: '/series/agent-platform-2026/06-durable-execution-checkpoint' },
      { text: '07 统一 Execution Runtime 与多执行后端', link: '/series/agent-platform-2026/07-execution-runtime-backends' },
      { text: '08 Agent 安全执行环境：容器、虚拟机与轻量 Sandbox', link: '/series/agent-platform-2026/08-sandbox-execution-environment' },
      { text: '09 为什么 Agent 安全不同：资产、主体与信任边界', link: '/series/agent-platform-2026/09-agent-security-differences' },
      { text: '10 OWASP Agentic Top 10 2026 架构化解读', link: '/series/agent-platform-2026/10-owasp-agentic-top10' },
      { text: '11 攻击知识库与三框架协同：MITRE ATLAS × MAESTRO × OWASP', link: '/series/agent-platform-2026/11-attack-knowledge-base' },
      { text: '12 零信任 Agent 架构：身份、委托、授权与凭据', link: '/series/agent-platform-2026/12-zero-trust-agent' },
      { text: '13 Agent 网关、安全治理与能力选型', link: '/series/agent-platform-2026/13-agent-gateway' },
      { text: '14 Agent 的数据、记忆、产物与费用', link: '/series/agent-platform-2026/14-data-memory-artifact-cost' },
      { text: '15 Agent 平台弹性资源架构：资源池、容量与扩缩', link: '/series/agent-platform-2026/15-elastic-resource' },
      { text: '16 高并发 Agent 平台：队列、公平、背压与负载验证', link: '/series/agent-platform-2026/16-high-concurrency' },
      { text: '17 高可用 Agent 平台：故障域、降级与容灾', link: '/series/agent-platform-2026/17-high-availability' },
      { text: '18 Agent 可观测、审计、评测与 FinOps', link: '/series/agent-platform-2026/18-observability-audit-finops' },
      { text: '19 技术选型、部署模式与生产准入', link: '/series/agent-platform-2026/19-tech-selection-deployment-admission' },
            ]
          }
        ],
        '/essays/': [
          { text: '随笔文章', link: '/essays/' }
        ]
      },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
            modal: {
              noResultsText: '没有找到相关结果',
              resetButtonTitle: '清除查询',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        }
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/toroad/toroad.github.io' }
      ]
    },

    mermaid: {
      // mermaid 主题配置（可选）
    },
    mermaidPlugin: {
      class: 'mermaid'
    }
  })
)
