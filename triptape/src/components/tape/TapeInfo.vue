<script setup>

</script>

<template>
  <div class="card">
    <img src="https://images.dog.ceo/breeds/terrier-wheaten/n02098105_2456.jpg">
    <div>
      <h2>테이프 이름</h2>
      <p>테이프 설명</p>
      <p>테이프 작성자 | 테이프 생성일</p>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 8px;
}
.card {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
}

.card > img {
  border-radius: 12px;
}
</style>