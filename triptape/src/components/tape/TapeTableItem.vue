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
	<!-- <div class="item reactive" @click="$router.push({name: 'tapeDetail', params: {id: tapeKey}})"> -->
	<div class="item reactive" @click="$emit('onClickItem', tapeKey)">
		<p class="title">{{ title }}</p>
		<p class="caption">{{ description }}</p>
	</div>
</template>

<style scoped>
.title {
	font-weight: 700;
	margin-bottom: 8px;
}
.item {
	border-bottom: 1px solid #DDDDDD;
	padding: 8px;
}
</style>