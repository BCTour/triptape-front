<script setup>
defineProps({
  commentKey: Number,
  userKey: Number,
  attractionKey: Number,
  content: String,
  createtime: String
})

</script>

<template>
  <div class="comment-container reactive">
    <div class="caption">@{{ userKey }} / {{ createtime }}</div>
    <div>{{ content }}</div>
  </div>
</template>

<style scoped>
.comment-container {
  border-bottom: 1px solid #DDDDDD;
  padding: 16px;
}
</style>