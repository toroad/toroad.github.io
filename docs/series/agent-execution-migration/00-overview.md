---
title: "总纲：从云基础设施到 Agent 执行层的能力迁移地图"
order: 0
description: "能力迁移、Agent 执行层、K8s 资源模型、FaaS 冷启动、状态外置、多租户隔离"
---

# 总纲：从云基础设施到 Agent 执行层的能力迁移地图

> **系列**：云基础设施 → Agent 执行层：能力迁移 · 第 0 篇（总纲）
> **定位**：系列入口 · 方法论框架
> **前置阅读**：[生产级 Agent 平台架构 2026 · 总纲](/series/agent-platform-2026/00-overview)（建议先读，本系列是其执行层命题的能力溯源）

> 编排框架已经把"做出一个 Agent"的门槛打到地板上。真正决定 Agent 能否进生产的，是执行层——而执行层的问题，云基础设施十年前就开始解决了。

## 摘要

本系列提出一个能力迁移框架：Agent 执行层不是全新领域，而是云基础设施能力在新负载形态下的重演。K8s 资源模型、FaaS 冷启动、Serverless 状态外置、多租户隔离、微隔离与零信任五域的旧答案，构成 Agent 平台"坑的地图"。差异集中在三处新变量：负载形态（长脉冲会话）、确定性（LLM 输出不可重放）、威胁模型（prompt 注入使多租户从防过失升级为防主动攻击）。本文给出能力迁移总表与平台成熟度分级，后续各篇逐一深拆。

## 1. 方法论：坑的形状

当一个新技术形态出现时，不要急着学它的工具，先去找它的前身。Agent 执行层的前身是 FaaS 与云原生基础设施——新坑不会照旧坑长，但坑的分布规律是稳定的。旧答案的三个变量决定了迁移方式：

1. **负载形态**：Agent 会话是"长脉冲"负载——思考阶段近零 CPU，工具执行阶段突发高负载，叠加 LLM 调用的长尾延迟；
2. **确定性**：LLM 输出不可重放，动摇了事件溯源"可复现"的传统前提；
3. **威胁模型**：prompt 注入使多租户从"防过失"升级为"防主动攻击"。

## 2. 能力迁移地图

| 篇目 | 云基础设施能力域 | 核心机制 | Agent 执行层对应物 | 新增设计约束 |
|---|---|---|---|---|
| [01](./01-k8s-resource-model) | K8s 资源模型 | requests/limits、QoS 分级、调度框架、超卖 | Agent 会话的资源画像与调度成本函数 | 放置错误的粘性代价（小时级） |
| [02](./02-faas-cold-start) | FaaS 冷启动 | 预热池、快照恢复、轻量 MicroVM | Agent 沙箱分级供给 | 上下文注入成本与预热池隔离边界 |
| [03](./03-state-externalization) | Serverless 状态外置 | 状态与计算分离、事件溯源、乐观锁 | Agent 三层状态与 Checkpoint | LLM 不可重放性 → 审计降级为追溯 |
| [04](./04-multi-tenant-isolation) | 多租户隔离 | namespace/cgroups → gVisor → MicroVM | 沙箱选型与隔离边界设计 | 威胁模型升级 + 任务级隔离粒度 |
| [05](./05-microisolation-east-west) | 微隔离 / Service Mesh | Envoy、ExtAuthz、eBPF、身份锚点 | Agent 东西向流量治理（MCP 调用授权与审计） | 任务级身份锚点 + 密度模型冲突 |
| [06](./06-zero-trust-agent-identity) | 零信任身份 | mTLS、SPIFFE、OAuth 2.1、Token Exchange | Agent 身份治理与鉴权全案 | 三重身份 + 委托链 + 不可信客户端 |
| [07](./07-streaming-task-orchestration) | 高并发流式平台 | 分区亲和、背压、水位线、幂等、CAS | Agent 任务编排与事件驱动 | 瓶颈从算力变为配额，延迟哲学反转 |
| [08](./08-ha-resilience) | 高可用 / 韧性工程 | 故障域、降级链、多活、混沌工程 | Agent 会话级韧性与 LLM 依赖治理 | 威胁源移到平台边界之外，降级产品化 |

每篇的固定结构：**当年坑的形状 → 当年怎么解的 → Agent 时代坑的新形态 → 旧答案迁移时改什么 → 迁移清单**。迁移清单可直接作为设计评审 checklist。

## 3. 与《生产级 Agent 平台架构 2026》的关系

主系列把 Execution Runtime 定义为多执行后端的统一承载（[第 7 篇](/series/agent-platform-2026/07-execution-runtime-backends)），并给出沙箱的分类框架（[第 8 篇](/series/agent-platform-2026/08-sandbox-execution-environment)）；本系列补充的是这些组件的**能力溯源**——回答的不是"要不要沙箱"，而是：

- 沙箱放哪、给多少资源（01）；
- 沙箱多快就位（02）；
- 沙箱死了会话能否复活（03）；
- 沙箱里的混乱是否外溢（04）；
- Agent 与外界的每次交互是否被验证（05）。

## 4. 平台成熟度分级

迁移成熟度分四级，可对号入座：

- **L0 裸奔**：Agent 跑在共享集群的普通 Pod 里，无隔离、无 Checkpoint、调度交给默认 kube-scheduler——多数 demo 平台停留在此；
- **L1 隔离**：有沙箱但选型未对齐威胁模型，有 Checkpoint 但混用逻辑断点与物理快照；
- **L2 成体系**：沙箱/状态/调度/身份四域有独立设计，且互相引用（隔离边界绑定身份作用域、调度考虑 Checkpoint 亲和）；
- **L3 协同优化**：四域开始联合优化——用会话状态预取弥补冷启动，用任务级凭据衰减缩小隔离边界——这是 2026 年执行层的竞争焦点所在。

判断一个平台在 L1 还是 L2 的试金石：它的沙箱方案是否讲得清"预热的实例凭什么属于这个会话"（第 02 篇），Checkpoint 方案是否承认"重放会得到不同结果"（第 03 篇），以及东西向流量是否做到调用时动态授权（第 05 篇）。

## 5. 阅读顺序与受众

- **平台建设者**：按 01 → 08 顺序读，每篇末尾的迁移清单可直接作为设计评审 checklist；
- **架构评估者**：先读 04 的选型决策树（多数平台在沙箱这一关就不及格），再回看 02、03、05；
- **从应用层转 Infra 的工程师**：先补 01 的 K8s 资源模型基础，这是全系列的地基。

---

- [01 K8s 资源模型 → Agent 会话调度](./01-k8s-resource-model)
- [02 FaaS 冷启动 → Agent 沙箱供给](./02-faas-cold-start)
- [03 Serverless 状态外置 → Agent Checkpoint](./03-state-externalization)
- [04 多租户隔离 → Agent 沙箱选型与边界](./04-multi-tenant-isolation)
- [05 微隔离 → Agent 东西向治理：Envoy、eBPF 与任务级身份](./05-microisolation-east-west)
- [06 零信任 → Agent 身份治理与鉴权：mTLS 与 OAuth 2.1 全案](./06-zero-trust-agent-identity)
- [07 高并发流式平台 → Agent 任务编排：三层分离与事件驱动](./07-streaming-task-orchestration)
- [08 高可用平台 → Agent 韧性：故障域、降级链与多活](./08-ha-resilience)
