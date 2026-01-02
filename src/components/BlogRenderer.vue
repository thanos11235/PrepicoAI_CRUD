<template>
  <div class="blog-renderer">
    <ContentBlock
      v-for="block in content.blocks"
      :key="block.id"
      :block="block"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import ContentBlock from './ContentBlock.vue'

defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.blog-renderer {
  padding: 2rem 0;
}
</style>