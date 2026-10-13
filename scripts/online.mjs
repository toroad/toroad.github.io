/**
 * 重新上线一篇文章/页面：移除 front matter 中的 draft: true
 * 用法：npm run online -- docs/series/agent-platform-2026/07-execution-runtime-backends.md
 */
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('用法: npm run online -- <md文件路径>')
  process.exit(1)
}
if (!fs.existsSync(file)) {
  console.error('文件不存在: ' + file)
  process.exit(1)
}

const txt = fs.readFileSync(file, 'utf8')
if (!/^draft:\s*true\n?/m.test(txt)) {
  console.log('该文件不含 draft 标记，无需操作: ' + file)
  process.exit(0)
}

const next = txt.replace(/^draft:\s*true\n?/m, '')
fs.writeFileSync(file, next, 'utf8')
console.log('已恢复上线（draft 标记已移除）: ' + file)
