<template>
  <!--
    启用步骤（约 5 分钟）：
    1. GitHub 仓库设为 Public，并在仓库 Settings > General > Features 勾选 Discussions
    2. 安装 Giscus App：https://github.com/apps/giscus 授权到本仓库
    3. 打开 https://giscus.app/zh-CN 填写仓库名，复制生成的
       data-repo-id / data-category / data-category-id 替换下面三处
    4. 如暂不需要评论，删除 theme/index.ts 中的 GiscusComments 引用即可
  -->
  <div v-if="enabled" class="giscus-wrapper">
    <component :is="'script'"
      src="https://giscus.app/client.js"
      :data-repo="'toroad/toroad.github.io'"
      :data-repo-id="'REPLACE_ME'"
      :data-category="'General'"
      :data-category-id="'REPLACE_ME'"
      :data-mapping="'pathname'"
      :data-strict="'0'"
      :data-reactions-enabled="'1'"
      :data-emit-metadata="'0'"
      :data-input-position="'top'"
      :data-theme="'preferred_color_scheme'"
      :data-lang="'zh-CN'"
      crossorigin="anonymous"
      async />
  </div>
</template>

<script setup lang="ts">
// 配置完成前保持 false，配置好后改为 true
const enabled = false
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}
</style>
