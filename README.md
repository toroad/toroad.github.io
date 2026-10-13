# Jack Zhang 的技术笔记

Agent 架构、AI 基础设施与生产级系统设计的深度技术写作。

## 在线阅读

**https://toroad.github.io**

## 当前系列

**生产级 Agent 平台架构 2026**（20 篇，已完结）
入口：https://toroad.github.io/series/agent-platform-2026/00-overview

| 篇 | 主题 |
|---|---|
| 00 | 从模型推理到生产运行：2026 年 Agent、Harness 与 Runtime 总体架构 |
| 01 | Agent、Harness 与 Runtime：生产级 Agent 平台的职责边界 |
| 02 | 从 Task 到交付：Agent 业务闭环与领域对象设计 |
| 03 | 生产级 Agent 平台总体架构：从主链到功能域 |
| 04 | Agent Runtime：从生命周期到执行治理的完整能力模型 |
| 05 | Harness 与 Agent Loop：行为组织、上下文工程与确定性控制 |
| 06 | 持久执行、Checkpoint 与副作用对账 |
| 07 | 统一 Execution Runtime 与多执行后端 |
| 08 | Agent 安全执行环境：容器、虚拟机与轻量 Sandbox |
| 09 | 为什么 Agent 安全不同：资产、主体与信任边界 |
| 10 | OWASP Agentic Top 10 2026 架构化解读 |
| 11 | 攻击知识库与三框架协同：MITRE ATLAS × MAESTRO × OWASP |
| 12 | 零信任 Agent 架构：身份、委托、授权与凭据 |
| 13 | Agent 网关、安全治理与能力选型 |
| 14 | Agent 的数据、记忆、产物与费用 |
| 15 | Agent 平台弹性资源架构：资源池、容量与扩缩 |
| 16 | 高并发 Agent 平台：队列、公平、背压与负载验证 |
| 17 | 高可用 Agent 平台：故障域、降级与容灾 |
| 18 | Agent 可观测、审计、评测与 FinOps |
| 19 | 技术选型、部署模式与生产准入 |

## 发布步骤（首次，约 15 分钟）

```bash
# 1. 安装依赖并本地预览
npm install
npm run dev        # http://localhost:5173 检查 mermaid 图渲染

# 2. 初始化并推送（注意：仓库名必须是 toroad.github.io（用户主页仓库））
git init && git add -A && git commit -m "init: 技术笔记站点 + Agent 平台架构系列 20 篇"
git branch -M main
git remote add origin https://github.com/toroad/toroad.github.io.git
git push -u origin main

# 3. GitHub 网页端：先在 github.com/new 创建 Public 仓库 toroad.github.io（不要勾 README），
#    推送后在仓库 Settings > Pages > Source 选 "GitHub Actions"
#    Action 自动构建发布，约 2 分钟生效
```

## 后续创作怎么加内容

- **单篇随笔**：在 `docs/essays/` 新建 `.md` 文件，并在 `config.mts` 的 `/essays/` 侧边栏组登记链接。
- **新系列**：在 `docs/series/` 下新建子目录（如 `docs/series/<series-slug>/`），在 `docs/series/index.md` 表格追加一行，并在 `config.mts` 的 sidebar 中按现有格式注册新的路径组。
- **更新已有文章**：直接改对应 md 文件 push 即可，约 2 分钟自动上线，"最后更新"时间自动刷新。

## 可选配置

- **评论区（Giscus）**：见 `docs/.vitepress/theme/GiscusComments.vue` 内注释，约 5 分钟。
- **自定义域名**：购域名后在仓库 Settings > Pages 绑定，并新建 `docs/public/CNAME` 写入域名；同时把 `config.mts` 的 `SITE_URL` 改为你的域名。
- **国内访问加速**：github.io 在大陆不稳定时，可将同一仓库再接入 Cloudflare Pages（免费）。

## 目录结构

```
docs/
├── index.md                    # 站点首页
├── series/                     # 系列专题（可扩展多个系列）
│   ├── index.md                # 系列总览
│   └── agent-platform-2026/    # 本系列 20 篇（mermaid 直接渲染）
├── essays/                     # 单篇随笔（未来创作）
└── .vitepress/                 # 站点配置
```

协议：内容版权归作者所有；站点代码 MIT。
