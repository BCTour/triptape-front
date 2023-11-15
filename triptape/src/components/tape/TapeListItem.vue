<!-- 
	장소별 테이프 리스트 조회 card에 들어가는 개별 테이프 아이템
-->
<script setup>
defineProps({
  title: String,
  tapeKey: Number,
  description: String,
  img: String,
})
</script>

<template>
	<div class="item reactive">
		<h3>{{ title }}</h3>
		<p>{{ description }}</p>
	</div>
</template>

<style scoped>
.item {
	border-bottom: 1px solid #DDDDDD;
	padding: 16px;
}
</style>