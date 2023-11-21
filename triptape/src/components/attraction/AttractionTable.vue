<script setup>

import { ref, onMounted} from 'vue';
import AttractionTableItem from '@/components/attraction/AttractionTableItem.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  attractions: Array,
})

const emit = defineEmits(["onClickItem"]);
const onClickItem = (key) => {
  emit("onClickItem", key);
}
</script>

<template>
  <div class="list scroll-view-container">
    <AttractionTableItem v-for="attraction in attractions" :key="attraction.attractionKey" v-bind="attraction" @on-click-item="onClickItem"/>
    <div v-if="attractions.length==0" class="caption no-content"><p>등록된 장소가 없습니다.</p></div>
  </div>
</template>

<style scoped>
.no-content{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>