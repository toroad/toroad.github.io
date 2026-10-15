---
layout: home

hero:
  name: Deep Systems
  text: 把系统讲透
  tagline: 网络 · 安全 · Agent · 软件架构<br>不写二手概念，只写经得起生产验证的底层逻辑
  actions:
    - theme: brand
      text: 阅读旗舰系列
      link: /series/agent-platform-2026/00-overview
    - theme: alt
      text: 全部内容
      link: /series/

features:
  - title: 网络
    details: 协议栈、网关与流量工程的原理拆解，从数据包到架构决策
  - title: 安全
    details: 威胁建模、零信任与攻防视角，OWASP / MITRE ATLAS / MAESTRO 的工程化落地
  - title: Agent
    details: Agent 平台架构、Runtime、持久执行与生产级治理的全栈剖析
  - title: 软件架构
    details: 高并发、高可用、弹性资源与复杂系统的设计权衡
---

## 旗舰系列：生产级 Agent 平台架构 2026

一套 **20 篇**的深度系列，回答一个问题：**2026 年，如何把 Agent 从 demo 变成生产系统？**

共同命题：*Agent 定义行为，Harness 组织与约束行为，Agent Runtime 承载并驱动行为，执行后端完成具体动作。*

| 部分 | 篇目 | 解决的问题 |
|---|---|---|
| **架构与职责** | [01](series/agent-platform-2026/01-harness-runtime-boundary)–[04](series/agent-platform-2026/04-agent-runtime-capability-model) | 职责边界、业务闭环、平台总体架构、Runtime 能力模型 |
| **执行与安全** | [05](series/agent-platform-2026/05-harness-agent-loop)–[12](series/agent-platform-2026/12-zero-trust-agent) | Agent Loop、持久执行、多执行后端、安全环境、威胁模型、零信任 |
| **数据、规模与可靠性** | [13](series/agent-platform-2026/13-agent-gateway)–[17](series/agent-platform-2026/17-high-availability) | 网关治理、数据与费用、弹性资源、高并发、高可用 |
| **运营与落地** | [18](series/agent-platform-2026/18-observability-audit-finops)–[19](series/agent-platform-2026/19-tech-selection-deployment-admission) | 可观测与 FinOps、技术选型与生产准入 |

从 [总纲：从模型推理到生产运行](series/agent-platform-2026/00-overview) 开始读。

## 新系列：云基础设施 → Agent 执行层：能力迁移

一个 **6 篇**（连载中）的深度系列，回答一个问题：**Agent 执行层的坑，云基础设施是不是十年前就踩过一遍？**

核心论点：*K8s 资源模型、FaaS 冷启动、Serverless 状态外置、多租户隔离、微隔离五域的旧答案，构成 Agent 平台"坑的地图"——负载形态、LLM 不可重放性、prompt 注入威胁模型是仅有的三个新变量。*

| 篇目 | 迁移映射 | 核心设计 |
|---|---|---|
| [01](series/agent-execution-migration/01-k8s-resource-model) | K8s 资源模型 → 会话调度 | 相位资源契约、QoS 绑定会话价值、状态亲和调度 |
| [02](series/agent-execution-migration/02-faas-cold-start) | FaaS 冷启动 → 沙箱供给 | 半成品预热池、原子绑定协议、分层快照 |
| [03](series/agent-execution-migration/03-state-externalization) | 状态外置 → Checkpoint | 三层状态、逻辑断点 vs 物理快照、审计降级为追溯 |
| [04](series/agent-execution-migration/04-multi-tenant-isolation) | 多租户隔离 → 沙箱边界 | 威胁模型升级、任务级隔离、凭据作用域铁律 |
| [05](series/agent-execution-migration/05-microisolation-east-west) | 微隔离 → 东西向治理 | 任务级身份、ExtAuthz 动态授权、eBPF 底座 + Envoy 手术刀 |

从 [总纲：能力迁移地图](series/agent-execution-migration/00-overview) 开始读。

## 专题方向

按四条主线规划内容，每条主线都会逐步形成闭环系列：

| 方向 | 已发布 | 筹备中 |
|---|---|---|
| **Agent** | [生产级 Agent 平台架构 2026](series/agent-platform-2026/00-overview)（20 篇） · [能力迁移系列](series/agent-execution-migration/00-overview)（6 篇连载中） | Agent 可观测与评测体系 · MCP/A2A 协议生态深拆 |
| **安全** | — | 零信任架构落地 · 软件供应链安全 · 攻防视角的系统设计 |
| **网络** | — | API 网关架构演进 · HTTP/3 与 QUIC 工程实践 · 零信任网络 |
| **软件架构** | — | 高并发系统设计 · 事件驱动与持久执行 · 平台工程 |

> 选题会根据写作进度调整；有想看的主题欢迎到 [Issues](https://github.com/toroad/toroad.github.io/issues) 提建议。

## 写作原则

- **原理深拆**：不写"是什么"的二手综述，写"为什么这样设计"的第一性分析
- **图文互证**：复杂机制必须配图，全系列 240+ 张架构图，图与文严格对齐
- **生产视角**：每个论断都回答"故障时会发生什么"，而非只描述正常路径
- **持续修订**：文章随认知与事实更新，每篇页脚显示真实的最后更新时间

## 关于作者

**jack zhang** — 关注网络、安全、Agent 与软件架构的系统工程师。相信深度内容的价值随时间复利增长。

- GitHub：[@toroad](https://github.com/toroad)
- 内容纠错与讨论：欢迎到 [仓库 Issues](https://github.com/toroad/toroad.github.io/issues) 提出

## 关于本站

本站为纯静态站点（VitePress + GitHub Pages 构建），无广告、无追踪脚本。所有文章以 Markdown 开源维护，修订历史完全公开可查。
