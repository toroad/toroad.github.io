<template>
  <div class="hero-clip">
    <img src="/media/hammer-poster.jpg" alt="把复杂系统，一锤一锤拆开" width="320" height="320" />
    <p class="hero-clip-caption">把复杂系统，一锤一锤拆开。</p>
  </div>
</template>

<style scoped>
.hero-clip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.hero-clip img {
  border-radius: 20px;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.14),
    0 2px 8px rgba(0, 0, 0, 0.08);
  width: 320px;
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.hero-clip img:hover {
  transform: translateY(-4px);
}

.hero-clip-caption {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .hero-clip img {
    width: 240px;
  }
}
</style>
