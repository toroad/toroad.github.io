import DefaultTheme from 'vitepress/theme'
import GiscusComments from './GiscusComments.vue'
import HeroVideo from './HeroVideo.vue'
import { h } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在每篇文章正文底部注入 Giscus 评论区
      'doc-after': () => h(GiscusComments),
      // 首页 hero 区右侧：用循环视频替代静态图片
      'home-hero-image': () => h(HeroVideo)
    })
  }
}
