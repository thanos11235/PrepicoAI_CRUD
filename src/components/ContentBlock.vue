<template>
  <div class="content-block" :class="`block-${block.type}`">
    <!-- Text Block -->
    <p v-if="block.type === 'text'" class="text-block" v-html="formatText(block.content)"></p>

    <!-- Bullet List Block -->
    <ul v-else-if="block.type === 'bulletList'" class="bullet-list">
      <li v-for="(item, index) in block.items" :key="index">{{ item }}</li>
    </ul>

    <!-- Image Block -->
    <div v-else-if="block.type === 'image'" class="image-block">
      <img :src="block.url" :alt="block.alt || 'Blog image'" />
      <p v-if="block.caption" class="caption">{{ block.caption }}</p>
    </div>

    <!-- Video Block -->
    <div v-else-if="block.type === 'video'" class="video-block">
      <iframe
        :src="getEmbedUrl(block.url)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <p v-if="block.caption" class="caption">{{ block.caption }}</p>
    </div>

    <!-- Audio Block -->
    <div v-else-if="block.type === 'audio'" class="audio-block">
      <audio controls :src="block.url"></audio>
      <p v-if="block.caption" class="caption">{{ block.caption }}</p>
    </div>

    <!-- File Block -->
    <div v-else-if="block.type === 'file'" class="file-block">
      <a :href="block.url" :download="block.fileName" target="_blank" class="file-link">
        <span class="icon">📎</span>
        <span class="file-info">
          <span class="file-name">{{ block.fileName }}</span>
          <span v-if="block.fileSize" class="file-size">{{ formatFileSize(block.fileSize) }}</span>
        </span>
        <span class="download-icon">⬇️</span>
      </a>
    </div>

    <!-- Row Block (Horizontal Layout) -->
    <div v-else-if="block.type === 'row'" class="row-block">
      <ContentBlock
        v-for="child in block.children"
        :key="child.id"
        :block="child"
        class="row-item"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  block: {
    type: Object,
    required: true
  }
})

function formatText(text) {
  return text.replace(/\n/g, '<br>')
}

function getEmbedUrl(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]
    return `https://player.vimeo.com/video/${videoId}`
  }
  return url
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<style scoped>
.content-block {
  margin-bottom: 2rem;
}

.text-block {
  font-size: clamp(1.05rem, 2.6vw, 1.15rem);
  line-height: 1.8;
  color: var(--text);
}

.bullet-list {
  font-size: clamp(1.05rem, 2.6vw, 1.15rem);
  line-height: 1.8;
  color: var(--text);
  padding-left: 2rem;
}

.bullet-list li {
  margin-bottom: 0.5rem;
}

.image-block {
  margin: 2rem 0;
}

.image-block img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.caption {
  text-align: center;
  color: var(--text-light);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
}

.video-block {
  margin: 2rem 0;
}

.video-block iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.audio-block {
  margin: 2rem 0;
}

.audio-block audio {
  width: 100%;
  border-radius: 0.5rem;
}

.file-block {
  margin: 1.5rem 0;
}

.file-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s;
}

.file-link:hover {
  background: var(--bg-secondary);
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.file-link .icon {
  font-size: 1.5rem;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: 600;
  color: var(--text);
}

.file-size {
  font-size: 0.875rem;
  color: var(--text-light);
}

.download-icon {
  font-size: 1.25rem;
}

.row-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--bg);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

.row-item {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .row-block {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .content-block {
    margin-bottom: 1.5rem;
  }

  .image-block, .video-block, .audio-block {
    margin: 1.25rem 0;
  }

  .bullet-list {
    padding-left: 1.25rem;
  }
}

@media (max-width: 540px) {
  .row-block {
    padding: 1.1rem;
  }

  .video-block iframe {
    border-radius: 0.4rem;
  }
}
</style>