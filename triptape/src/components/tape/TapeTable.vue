<script setup>
import { ref, onMounted} from 'vue';
import TapeTableItem from '@/components/tape/TapeTableItem.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  tapes: Array,
})

const emit = defineEmits(["onClickItem"]);
const onClickItem = (key) => {
  emit("onClickItem", key);
}
</script>

<template>
  <div class="list scroll-view-container">
    <TapeTableItem v-for="tape in tapes" :key="tapeKey" v-bind="tape" @on-click-item="onClickItem"/>
    <div v-if="tapes.length == 0" class="caption no-content"><p>등록된 테이프가 없습니다.</p></div>
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