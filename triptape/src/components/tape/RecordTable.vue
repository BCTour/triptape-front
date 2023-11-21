<script setup>

import { ref, onMounted} from 'vue';
import RecordTableItem from '@/components/tape/RecordTableItem.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  records: Array,
})

const emit = defineEmits(["onClickItem"]);
const onClickItem = (key) => {
  emit("onClickItem", key);
}
</script>

<template>
  <div class="list scroll-view-container">
    <RecordTableItem v-for="record in records" :key="recordKey" v-bind="record" @on-click-item="onClickItem"/>
    <div v-if="records.length==0" class="caption no-content"><p>등록된 레코드가 없습니다.</p></div>
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