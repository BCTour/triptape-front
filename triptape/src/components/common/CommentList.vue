<script setup>
import CommentItem from './CommentItem.vue';
import Observer from '@/components/common/Observer.vue';
const props = defineProps({
  comments: Array,
})
</script>

<template>
  <div class="comment-list-container scroll-view-container">
    <CommentItem v-for="comment in comments" :key="comment.commentKey" @on-click-delete="$emit('onReload')" v-bind="comment"/>     
    <Observer @onObserved="$emit('onLoadMore')"/>
  </div>
</template>

<style scoped>
.comment-list-container {
  
}
</style>