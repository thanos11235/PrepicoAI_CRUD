<template>
  <div class="view-blog">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading blog...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error">
        <h2>Blog not found</h2>
        <p>{{ error }}</p>
        <router-link to="/" class="btn btn-primary">Back to Blogs</router-link>
      </div>
    </div>

    <div v-else-if="blog" class="blog-content">
      <div class="blog-header">
        <div v-if="blog.thumbnail" class="header-image">
          <img :src="blog.thumbnail" :alt="blog.title" />
        </div>
        <div class="container">
          <h1>{{ blog.title }}</h1>
          <p class="date">{{ formatDate(blog.created_at) }}</p>
        </div>
      </div>
      
      <div class="container">
        <BlogRenderer :content="blog.content" />
        
        <div class="back-link">
          <router-link to="/" class="btn btn-secondary">← Back to All Blogs</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../composables/useSupabase'
import BlogRenderer from '../components/BlogRenderer.vue'

const route = useRoute()
const blog = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (fetchError) throw fetchError
    blog.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
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
.view-blog {
  min-height: calc(100vh - 80px);
}

.loading, .error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

.loading {
  flex-direction: column;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
}

.error h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.error p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.blog-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
}

.header-image {
  width: 100%;
  height: clamp(220px, 45vw, 420px);
  overflow: hidden;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-header .container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-header h1 {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.date {
  color: var(--text-light);
  font-size: 0.95rem;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  border: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.2s ease;
}

.back-link .btn {
  width: 100%;
  max-width: 340px;
  text-align: center;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--secondary);
}

.btn-secondary {
  background: #e7efff;
  color: var(--primary);
  border: none;
}

.btn-secondary:hover {
  background: #d1e3ff;
}

@media (max-width: 768px) {
  .header-image {
    height: 250px;
  }

  .blog-header h1 {
    font-size: 1.75rem;
  }
}

@media (max-width: 540px) {
  .blog-header .container,
  .container {
    padding: 0 1.1rem;
  }

  .back-link {
    margin-top: 2.25rem;
    padding: 1.5rem 0;
  }
}
</style>