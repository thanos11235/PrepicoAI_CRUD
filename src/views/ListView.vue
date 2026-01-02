<template>
  <div class="list-view">
  <div class="header">
        <h1>All Blogs</h1>
        <p>Explore our latest articles and insights</p>
      </div>
    <div class="container">

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading blogs...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="blogs.length === 0" class="empty">
        <p>No blogs yet. Visit the admin page to create one!</p>
        <router-link to="/admin" class="btn btn-primary">Create Blog</router-link>
      </div>

      <div v-else class="blog-grid">
        <BlogCard
          v-for="blog in blogs"
          :key="blog.id"
          :blog="blog"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'
import BlogCard from '../components/BlogCard.vue'

const blogs = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError
    blogs.value = data || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.list-view {
  padding: 3rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: clamp(2rem, 4vw, 2.6rem);
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.header p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 1.25rem;
}

.loading, .error, .empty {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #dc2626;
}

.empty p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
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

.btn-primary {
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--secondary);
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(1, 41, 135, 0.25);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
  }

  .header h1 {
    font-size: 2rem;
  }

  .container {
    padding: 0 1.1rem;
  }
}

@media (max-width: 540px) {
  .blog-grid {
    grid-template-columns: 1fr;
    width:100%;
    gap: 1rem;
  }

  .container {
    padding: 0 0.75rem;
  }

  .list-view {
    padding: 2rem 0;
  }

  .loading, .error, .empty {
    padding: 3rem 1.25rem;
  }

  .header p {
    font-size: 1rem;
  }
}
</style>