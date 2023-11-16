<script setup>
import { ref } from 'vue';
import AttractionItem from "@/components/attraction/AttractionItem.vue";

defineProps({
  attractions: Array,
})
</script>

<template>
  <div class="list scroll-view-container">
    <AttractionItem v-for="attraction in attractions" :key="attraction.attractionKey" v-bind="attraction" @click="$router.push({name: 'attractionDetail', params:{id: attraction.attractionKey}})"/>
    <button class="primary-btn" @click="$emit('onLoadMore')">추가로 로딩하기</button>
  </div>
</template>

<style scoped>


</style>