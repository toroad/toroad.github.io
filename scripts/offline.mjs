/**
 * 下线一篇文章/页面：在其 front matter 中写入 draft: true
 * 用法：npm run offline -- docs/series/agent-platform-2026/07-execution-runtime-backends.md
 * 效果：该页不进入构建产物、不出现在侧边栏，文件仍保留在仓库中
 */
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('用法: npm run offline -- <md文件路径>')
  process.exit(1)
}
if (!fs.existsSync(file)) {
  console.error('文件不存在: ' + file)
  process.exit(1)
}

const txt = fs.readFileSync(file, 'utf8')
if (/^draft:\s*true/m.test(txt)) {
  console.log('已是下线状态，无需操作: ' + file)
  process.exit(0)
}

const fmMatch = txt.match(/^---\n([\s\S]*?)\n---\n/)
let next
if (fmMatch) {
  next = txt.replace(/^---\n/, '---\ndraft: true\n')
} else {
  // 无 front matter 时新建一个
  next = '---\ndraft: true\n---\n\n' + txt
}

fs.writeFileSync(file, next, 'utf8')
console.log('已下线（draft: true 已写入）: ' + file)
console.log('重新上线：npm run online -- ' + file)
