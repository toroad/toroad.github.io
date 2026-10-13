import DefaultTheme from 'vitepress/theme'
import GiscusComments from './GiscusComments.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在每篇文章正文底部注入 Giscus 评论区
      'doc-after': () => h(GiscusComments)
    })
  }
}
