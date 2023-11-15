<script setup>
import CommentItem from './CommentItem.vue';
import { ref } from 'vue';
const comments = ref([
  {
    commentKey: 1,
    userKey: 1,
    attractionKey: 1,
    content: "너무 졸립네요. 하루에 6시간 정도는,,,자야겠어요...:)",
    createtime: "2023-04-26 00:00:00",
  },
  {
    commentKey: 2,
    userKey: 1,
    attractionKey: 1,
    content: "너무 졸립네요. 하루에 6시간 정도는,,,자야겠어요...:)",
    createtime: "2023-04-26 00:00:00",
  },
  {
    commentKey: 3,
    userKey: 1,
    attractionKey: 1,
    content: "너무 졸립네요. 하루에 6시간 정도는,,,자야겠어요...:)",
    createtime: "2023-04-26 00:00:00",
  },
]);
</script>



<template>
  <div class="comment-list-container scroll-view-container">
    <CommentItem v-for="comment in comments" :key="comment.commentKey" v-bind="comment"/>     
  </div>
</template>

<style scoped>
.comment-list-container {
  
}
</style>