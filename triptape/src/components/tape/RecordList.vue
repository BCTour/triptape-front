<script setup>
import { ref, onMounted } from 'vue';
import Record from "@/components/tape/Record.vue";
import {connect} from '@/util/access.js';
import Observer from '@/components/common/Observer.vue';

const props = defineProps({
  // id: Number,
  records: Array,
})

onMounted( async ()=>{
  // await loadMoreRecord();
});

const currentPage = ref(1);

// const loadMoreRecord = async () => {
//   try {
//     const result = await connect({
//       method: "GET",
//       url: `/record/search/${props.id}?currentPage=${currentPage.value++}`,
//     })
//     console.log(result);
//     records.value.push(...result.data.attraction);
//   } catch (error) {
//     console.log(error);
//   }
// }
const emit = defineEmits(["onDeleteItem"]);
const onDeleteItem = (recordKey) => {
  emit("onDeleteItem", recordKey);
}
</script>

<template>
  <div class="list scroll-view-container">
    <Record v-for="record in records" :key="record.recordKey" v-bind="record" @click="$emit('onSelectRecord', record.recordKey)" @on-delete="onDeleteItem"/>
    <Observer @onObserved="$emit('onLoadMore')"/>
  </div>
</template>

<style scoped>

</style>