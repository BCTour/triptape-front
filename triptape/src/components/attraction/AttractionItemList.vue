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
    <AttractionItem v-for="attraction in attractions" :key="attraction.attractionKey" v-bind="attraction" @click="$router.push({name: 'attractionDetail', params:{id: attraction.attractionKey}})"/>
    <Observer @on-observed="$emit('onLoadMore')"/>
  </div>
</template>

<style scoped>


</style>