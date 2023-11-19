<script setup>
import { ref, onMounted } from 'vue';
import AttractionItem from "@/components/attraction/AttractionItem.vue";
import Observer from "../common/Observer.vue";

const props = defineProps({
  attractions: Array,
})

onMounted(() => {
  console.log(props.attractions)
});
</script>

<template>
  <div class="list scroll-view-container">
    <div v-if="attractions.length == 0" class="no-content">등록된 장소가 없습니다.</div>
    <AttractionItem
      v-for="attraction in attractions" :key="attraction.attractionKey"
      v-bind="attraction"
      @click="$emit('onClickItem', attraction)"
    />
    <!-- @click="$router.push({name: 'attractionDetail', params:{id: attraction.attractionKey}})" -->

    <Observer @on-observed="$emit('onLoadMore')"/>
  </div>
</template>

<style scoped>
.no-content {
	display: flex;
	width: 100%;
	height: 100%;
	/* text-align: center; */
	align-items: center;
	justify-content: center;
  font-size: 14px;
  color: var(--caption-color);
}
</style>