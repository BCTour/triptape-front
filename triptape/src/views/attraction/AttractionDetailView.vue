<script setup>
import CommentList from '@/components/common/CommentList.vue';
import CreateComment from '@/components/common/CreateComment.vue';
</script>

<template>
  <div class="detail-container">
    <div class="card">
      <img src="../../assets/img/logo.png">
      <h3>장소 이름</h3>
      <p>카테고리</p>
      <p>주소</p>
      <p>설명</p>

    </div>
    <div class="card">
      
    </div>
    <div class="card">
      <CommentList/>
      <CreateComment/>
      
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: row;
}

.card {
  flex: 1;
  margin-right: 8px;
}
</style>