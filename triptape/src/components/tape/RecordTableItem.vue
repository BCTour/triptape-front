<!-- 
	장소 리스트 조회 card에 들어가는 개별 테이프 아이템
-->
<script setup>

defineProps({
  tapeKey: Number,
  recordKey: Number,
  content: String,
  createtime: String,
})
</script>

<template>
	<!-- <div class="item reactive" @click="$router.push({name: 'tapeDetail', params: {id: tapeKey}})"> -->
	<div class="item reactive" @click="$emit('onClickItem', tapeKey, recordKey)">
		<p>{{ content }}</p>
	</div>
</template>

<style scoped>
.item {
	border-bottom: 1px solid #DDDDDD;
	padding: 8px;
}
</style>