<template>
  <div class="admin-view">
  <h1>Blog Admin</h1>
    <div class="container">
      
      
      <!-- Editor Section -->
      <div class="editor-section">
        <h2>{{ editingBlog ? 'Edit Blog' : 'Create New Blog' }}</h2>
        
        <div class="form-group">
          <label>Blog Title *</label>
          <input
            v-model="blogTitle"
            type="text"
            placeholder="Enter blog title..."
            class="input"
          />
        </div>

        <div class="form-group">
          <label>Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleThumbnailUpload"
            class="input"
          />
          <div v-if="thumbnailUrl" class="thumbnail-preview">
            <img :src="thumbnailUrl" alt="Thumbnail preview" />
            <button @click="removeThumbnail" class="btn-remove">Remove</button>
          </div>
        </div>

        <div class="content-editor">
          <div class="editor-header">
            <h3>Content Blocks</h3>
            <div class="add-buttons">
              <button @click="addBlock('text')" class="btn btn-small">+ Text</button>
              <button @click="addBlock('bulletList')" class="btn btn-small">+ Bullets</button>
              <button @click="addBlock('image')" class="btn btn-small">+ Image</button>
              <button @click="addBlock('video')" class="btn btn-small">+ Video</button>
              <button @click="addBlock('audio')" class="btn btn-small">+ Audio</button>
              <button @click="addBlock('file')" class="btn btn-small">+ File</button>
              <button @click="addBlock('row')" class="btn btn-small btn-special">+ Row</button>
            </div>
          </div>

          <div class="blocks-container">
            <div
              v-for="(block, index) in contentBlocks"
              :key="block.id"
              class="block-editor"
            >
              <div class="block-header">
                <span class="block-type">{{ block.type }}</span>
                <div class="block-actions">
                  <button @click="moveBlock(index, -1)" :disabled="index === 0" class="btn-icon">↑</button>
                  <button @click="moveBlock(index, 1)" :disabled="index === contentBlocks.length - 1" class="btn-icon">↓</button>
                  <button @click="removeBlock(index)" class="btn-icon btn-danger">×</button>
                </div>
              </div>

              <div class="block-content">
                <!-- Text Block -->
                <textarea
                  v-if="block.type === 'text'"
                  v-model="block.content"
                  placeholder="Enter text content..."
                  rows="4"
                  class="textarea"
                ></textarea>

                <!-- Bullet List Block -->
                <div v-else-if="block.type === 'bulletList'" class="bullet-editor">
                  <div v-for="(item, i) in block.items" :key="i" class="bullet-item">
                    <input
                      v-model="block.items[i]"
                      type="text"
                      placeholder="Bullet point..."
                      class="input"
                    />
                    <button @click="removeBullet(block, i)" class="btn-icon btn-danger">×</button>
                  </div>
                  <button @click="addBullet(block)" class="btn btn-small">+ Add Bullet</button>
                </div>

                <!-- Image Block -->
                <div v-else-if="block.type === 'image'" class="media-editor">
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload($event, block)"
                    class="input"
                  />
                  <input
                    v-model="block.alt"
                    type="text"
                    placeholder="Alt text (optional)"
                    class="input"
                  />
                  <input
                    v-model="block.caption"
                    type="text"
                    placeholder="Caption (optional)"
                    class="input"
                  />
                  <div v-if="block.url" class="media-preview">
                    <img :src="block.url" alt="Preview" />
                  </div>
                </div>

                <!-- Video Block -->
                <div v-else-if="block.type === 'video'" class="media-editor">
                  <input
                    v-model="block.url"
                    type="text"
                    placeholder="Video URL (YouTube, Vimeo, etc.)"
                    class="input"
                  />
                  <input
                    v-model="block.caption"
                    type="text"
                    placeholder="Caption (optional)"
                    class="input"
                  />
                </div>

                <!-- Audio Block -->
                <div v-else-if="block.type === 'audio'" class="media-editor">
                  <input
                    v-model="block.url"
                    type="text"
                    placeholder="Audio URL"
                    class="input"
                  />
                  <input
                    v-model="block.caption"
                    type="text"
                    placeholder="Caption (optional)"
                    class="input"
                  />
                </div>

                <!-- File Block -->
                <div v-else-if="block.type === 'file'" class="media-editor">
                  <input
                    type="file"
                    @change="handleFileUpload($event, block)"
                    class="input"
                  />
                  <div v-if="block.url" class="file-info">
                    <p>{{ block.fileName }}</p>
                  </div>
                </div>

                <!-- Row Block -->
                <div v-else-if="block.type === 'row'" class="row-editor">
                  <p class="help-text">Add blocks inside this row for horizontal layout</p>
                  <div class="add-buttons">
                    <button @click="addBlockToRow(block, 'text')" class="btn btn-small">+ Text</button>
                    <button @click="addBlockToRow(block, 'image')" class="btn btn-small">+ Image</button>
                    <button @click="addBlockToRow(block, 'video')" class="btn btn-small">+ Video</button>
                  </div>
                  
                  <div v-if="block.children && block.children.length > 0" class="row-children">
                    <div
                      v-for="(child, childIndex) in block.children"
                      :key="child.id"
                      class="row-child"
                    >
                      <div class="block-header">
                        <span class="block-type">{{ child.type }}</span>
                        <button @click="removeRowChild(block, childIndex)" class="btn-icon btn-danger">×</button>
                      </div>
                      
                      <textarea
                        v-if="child.type === 'text'"
                        v-model="child.content"
                        placeholder="Enter text..."
                        rows="3"
                        class="textarea"
                      ></textarea>
                      
                      <div v-else-if="child.type === 'image'">
                        <input
                          type="file"
                          accept="image/*"
                          @change="handleImageUpload($event, child)"
                          class="input"
                        />
                        <div v-if="child.url" class="media-preview">
                          <img :src="child.url" alt="Preview" />
                        </div>
                      </div>
                      
                      <input
                        v-else-if="child.type === 'video'"
                        v-model="child.url"
                        type="text"
                        placeholder="Video URL"
                        class="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="contentBlocks.length === 0" class="empty-state">
              <p>No content blocks yet. Add your first block above!</p>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="saveBlog" :disabled="saving" class="btn btn-primary btn-large">
            {{ saving ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Save Blog') }}
          </button>
          <button v-if="editingBlog" @click="cancelEdit" class="btn btn-secondary">Cancel</button>
        </div>

        <div v-if="saveMessage" :class="['message', saveMessage.type]">
          {{ saveMessage.text }}
        </div>
      </div>

      <!-- Existing Blogs Section -->
      <div class="existing-blogs">
        <h2>Existing Blogs</h2>
        <div v-if="loadingBlogs" class="loading">Loading blogs...</div>
        <div v-else-if="existingBlogs.length === 0" class="empty">No blogs created yet.</div>
        <div v-else class="blogs-list">
          <div v-for="blog in existingBlogs" :key="blog.id" class="blog-item">
            <div class="blog-info">
              <h4>{{ blog.title }}</h4>
              <p>{{ formatDate(blog.created_at) }}</p>
            </div>
            <div class="blog-actions">
              <button @click="editBlog(blog)" class="btn btn-small">Edit</button>
              <button @click="deleteBlog(blog.id)" class="btn btn-small btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'

const blogTitle = ref('')
const thumbnailUrl = ref('')
const contentBlocks = ref([])
const saving = ref(false)
const saveMessage = ref(null)
const existingBlogs = ref([])
const loadingBlogs = ref(true)
const editingBlog = ref(null)

let blockIdCounter = 0

function generateBlockId() {
  return `block_${Date.now()}_${blockIdCounter++}`
}

function addBlock(type) {
  const newBlock = {
    id: generateBlockId(),
    type,
    content: '',
    items: type === 'bulletList' ? [''] : undefined,
    children: type === 'row' ? [] : undefined,
    url: '',
    alt: '',
    caption: '',
    fileName: '',
    fileSize: 0
  }
  contentBlocks.value.push(newBlock)
}

function addBlockToRow(row, type) {
  const newBlock = {
    id: generateBlockId(),
    type,
    content: '',
    url: '',
    alt: '',
    caption: ''
  }
  if (!row.children) row.children = []
  row.children.push(newBlock)
}

function removeRowChild(row, index) {
  row.children.splice(index, 1)
}

function removeBlock(index) {
  contentBlocks.value.splice(index, 1)
}

function moveBlock(index, direction) {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < contentBlocks.value.length) {
    const block = contentBlocks.value.splice(index, 1)[0]
    contentBlocks.value.splice(newIndex, 0, block)
  }
}

function addBullet(block) {
  block.items.push('')
}

function removeBullet(block, index) {
  block.items.splice(index, 1)
}

async function handleThumbnailUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `thumbnails/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath)

    thumbnailUrl.value = data.publicUrl
  } catch (error) {
    console.error('Error uploading thumbnail:', error)
    alert('Failed to upload thumbnail')
  }
}

function removeThumbnail() {
  thumbnailUrl.value = ''
}

async function handleImageUpload(event, block) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath)

    block.url = data.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Failed to upload image')
  }
}

async function handleFileUpload(event, block) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${file.name}`
    const filePath = `files/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath)

    block.url = data.publicUrl
    block.fileName = file.name
    block.fileSize = file.size
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Failed to upload file')
  }
}

async function saveBlog() {
  if (!blogTitle.value.trim()) {
    saveMessage.value = { type: 'error', text: 'Please enter a blog title' }
    return
  }

  if (contentBlocks.value.length === 0) {
    saveMessage.value = { type: 'error', text: 'Please add at least one content block' }
    return
  }

  saving.value = true
  saveMessage.value = null

  try {
    const blogData = {
      title: blogTitle.value,
      thumbnail: thumbnailUrl.value,
      content: { blocks: contentBlocks.value }
    }

    if (editingBlog.value) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.value.id)

      if (error) throw error
      saveMessage.value = { type: 'success', text: 'Blog updated successfully!' }
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData])

      if (error) throw error
      saveMessage.value = { type: 'success', text: 'Blog saved successfully!' }
    }

    resetForm()
    await loadExistingBlogs()
  } catch (error) {
    console.error('Error saving blog:', error)
    saveMessage.value = { type: 'error', text: `Error: ${error.message}` }
  } finally {
    saving.value = false
  }
}

function resetForm() {
  blogTitle.value = ''
  thumbnailUrl.value = ''
  contentBlocks.value = []
  editingBlog.value = null
}

function editBlog(blog) {
  editingBlog.value = blog
  blogTitle.value = blog.title
  thumbnailUrl.value = blog.thumbnail || ''
  contentBlocks.value = JSON.parse(JSON.stringify(blog.content.blocks))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit() {
  resetForm()
  saveMessage.value = null
}

async function deleteBlog(id) {
  if (!confirm('Are you sure you want to delete this blog?')) return

  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error
    await loadExistingBlogs()
  } catch (error) {
    console.error('Error deleting blog:', error)
    alert('Failed to delete blog')
  }
}

async function loadExistingBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    existingBlogs.value = data || []
  } catch (error) {
    console.error('Error loading blogs:', error)
  } finally {
    loadingBlogs.value = false
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadExistingBlogs()
})
</script>

<style scoped>
.admin-view {
  padding: 2rem 0;
  min-height: calc(100vh - 80px);
}

.admin-view > h1 {
  max-width: 1100px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: flex-start;
}

h1 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--primary);
  margin-bottom: 2rem;
}

h2 {
  font-size: clamp(1.35rem, 2.8vw, 1.75rem);
  color: var(--text);
  margin-bottom: 1.25rem;
}

h3 {
  font-size: clamp(1.1rem, 2.4vw, 1.25rem);
  color: var(--text);
  margin-bottom: 1rem;
}

.editor-section {
  background: var(--bg);
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  margin-bottom: 3rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.input, .textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.textarea {
  resize: vertical;
  font-family: inherit;
}

.thumbnail-preview {
  margin-top: 1rem;
  position: relative;
  max-width: 320px;
}

.thumbnail-preview img {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.btn-remove {
  margin-top: 0.5rem;
  background: #dc2626;
  color: #fff;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: none;
}

.content-editor {
  margin-top: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.add-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn {
  padding: 10px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.2s ease;
  background: var(--primary);
  color: #fff;
  border: none;
}

.btn:hover {
  background: var(--secondary);
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(1, 41, 135, 0.25);
}

.btn-small {
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 999px;
}

.btn-special {
  background: var(--accent);
}

.btn-special:hover {
  background: #059669;
}

.btn-large {
  padding: 12px 26px;
  font-size: 14px;
  border-radius: 999px;
}

.btn-secondary {
  background: #e7efff;
  color: var(--primary);
  border: none;
}

.btn-secondary:hover {
  background: #d1e3ff;
}

.btn-danger {
  background: #dc2626;
  color: #fff;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.blocks-container {
  background: var(--bg-secondary);
  padding: clamp(1rem, 2.8vw, 1.5rem);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

.block-editor {
  background: var(--bg);
  padding: clamp(1rem, 2.6vw, 1.5rem);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.block-type {
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  font-size: 0.875rem;
}

.block-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e7efff;
  color: var(--primary);
  border-radius: 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  transition: all 0.2s;
  border: 1px solid #cdd9f6;
  opacity: 0.92;
}

.btn-icon:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  opacity: 1;
  box-shadow: 0 8px 18px rgba(1, 41, 135, 0.22);
}

.btn-icon.btn-danger:hover {
  background: #dc2626;
  color: white;
}

.btn-icon:disabled {
  display: none;
}

.bullet-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bullet-item {
  display: flex;
  gap: 0.5rem;
}

.bullet-item .input {
  flex: 1;
}

.media-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.media-preview {
  max-width: 420px;
  margin-top: 0.5rem;
}

.media-preview img {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.file-info {
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.row-editor {
  border: 2px dashed var(--accent);
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f0fdf4;
}

.help-text {
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.row-children {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.row-child {
  background: var(--bg);
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-light);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.existing-blogs {
  background: var(--bg);
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1rem;
  box-shadow: var(--shadow);
}

.blogs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.blog-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  gap: 0.75rem;
}

.blog-info h4 {
  color: var(--text);
  margin-bottom: 0.25rem;
}

.blog-info p {
  color: var(--text-light);
  font-size: 0.875rem;
}

.blog-actions {
  display: flex;
  gap: 0.5rem;
}

.loading, .empty {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-buttons {
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
  }

  .blog-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .row-children {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1.1rem;
  }

  .admin-view > h1 {
    padding: 0 1.1rem;
    margin-bottom: 1.75rem;
  }

  .blocks-container {
    padding: 1rem;
  }

  .block-editor {
    padding: 1rem;
  }
  .editor-section
  {
    width: 100%;
  }
  .existing-blogs {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .admin-view {
    padding: 1.5rem 0;
  }

  .admin-view > h1 {
    padding: 0 1rem;
  }

  .add-buttons {
    gap: 0.4rem;
  }

  .btn-small {
    padding: 0.45rem 0.9rem;
  }

  .block-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .blog-item {
    padding: 0.9rem;
  }
}
</style>