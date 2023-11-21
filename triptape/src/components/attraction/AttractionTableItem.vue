<!-- 
	장소 리스트 조회 card에 들어가는 개별 테이프 아이템
-->
<script setup>

defineProps({
  name: String,
  attractionKey: Number,
  description: String,
  address: String,
  img: String,
})
</script>

<template>
	<!-- <div class="item reactive" @click="$router.push({name: 'tapeDetail', params: {id: tapeKey}})"> -->
	<div class="item reactive" @click="$emit('onClickItem', attractionKey)">
		<p class="title">{{ name }}</p>
		<p class="caption">{{ address }}</p>
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