<template>
  <router-link :to="`/blog/${blog.id}`" class="blog-card">
    <div class="thumbnail">
      <img v-if="blog.thumbnail" :src="blog.thumbnail" :alt="blog.title" />
      <div v-else class="placeholder">
        <span>📝</span>
      </div>
    </div>
    <div class="content">
      <h3>{{ blog.title }}</h3>
      <p class="date">{{ formatDate(blog.created_at) }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  blog: {
    type: Object,
    required: true
  }
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-card {
  display: block;
  background: var(--bg);
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: var(--shadow);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.thumbnail {
  width: 100%;
  height: clamp(180px, 28vw, 240px);
  overflow: hidden;
  background: var(--bg-secondary);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.placeholder span {
  font-size: 4rem;
}

.content {
  padding: 1.5rem;
}

.content h3 {
  color: var(--text);
  font-size: clamp(1.05rem, 2.6vw, 1.25rem);
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.date {
  color: var(--text-light);
  font-size: 0.9rem;
}

@media (max-width: 540px) {
  .blog-card {
    border-radius: 0.9rem;
  }

  .content {
    padding: 1.25rem;
  }
}
</style>