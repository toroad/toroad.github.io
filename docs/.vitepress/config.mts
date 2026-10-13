import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

// ============================================================
// 站点信息（用户主页仓库 toroad/toroad.github.io）
// 地址：https://toroad.github.io
// 若后续绑定自定义域名：只改 SITE_URL 一处即可，base 保持 '/'
//
//
// ============================================================
const SITE_URL = 'https://toroad.github.io'
const BASE = '/'

// ============================================================
// 暂存/下线机制
// 任意 md 的 front matter 中写 draft: true：
//   1. 该文件被加入 srcExclude，不进入构建产物（线上 404）
//   2. 自动侧边栏跳过该篇
// 恢复上线：删除该行（或 npm run online -- <文件>）
// ============================================================
const CONFIG_DIR = path.dirname(url.fileURLToPath(import.meta.url))
const DOCS_DIR = path.resolve(CONFIG_DIR, '..')

type FrontMatter = Record<string, string>

function parseFrontMatter(file: string): FrontMatter {
  const txt = fs.readFileSync(file, 'utf8')
  const m = txt.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return {}
  const data: FrontMatter = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return data
}

function walkMd(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walkMd(p, out)
    else if (entry.name.endsWith('.md')) out.push(p)
  }
  return out
}

const allMd = walkMd(DOCS_DIR)
const draftRelPaths = allMd
  .filter((f) => parseFrontMatter(f).draft === 'true')
  .map((f) => path.relative(DOCS_DIR, f).split(path.sep).join('/'))

/** 从目录自动生成系列侧边栏：按 front matter 的 order 排序，跳过 draft 篇 */
function seriesItems(dirRel: string) {
  const abs = path.join(DOCS_DIR, dirRel)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: f, fm: parseFrontMatter(path.join(abs, f)) }))
    .filter((x) => x.fm.draft !== 'true')
    .sort((a, b) => Number(a.fm.order ?? 99) - Number(b.fm.order ?? 99))
    .map((x) => ({
      text: `${String(x.fm.order ?? '').padStart(2, '0')} ${x.fm.title ?? x.file}`,
      link: `/${dirRel}/${x.file.replace(/\.md$/, '')}`
    }))
}

export default withMermaid(
  defineConfig({
    base: BASE,
    lang: 'zh-CN',
    title: "Deep Systems",
    description: '网络、安全、Agent 与软件架构的深度技术笔记',

    cleanUrls: true,
    lastUpdated: true,

    // draft 文件与 drafts/ 目录不进入构建
    srcExclude: ['**/drafts/**', ...draftRelPaths],

    sitemap: {
      hostname: SITE_URL + BASE
    },

    head: [
      ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      ['meta', { name: 'author', content: 'jack zhang' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'Deep Systems' }],
      ['meta', { property: 'og:description', content: '网络、安全、Agent 与软件架构的深度技术笔记' }],
      ['meta', { property: 'og:image', content: SITE_URL + '/media/hero.jpg' }]
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

      // 侧边栏按路径自动匹配：系列内容由 front matter 自动生成（draft 篇自动隐藏）
      sidebar: {
        '/series/agent-platform-2026/': [
          {
            text: '生产级 Agent 平台架构 2026',
            collapsed: false,
            items: seriesItems('series/agent-platform-2026')
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
