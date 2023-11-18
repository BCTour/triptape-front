<script setup>
import { ref, onMounted } from 'vue';
import Record from "@/components/tape/Record.vue";
import {connect} from '@/util/access.js';

const props = defineProps({
  id: Number,
})

onMounted( async ()=>{
  await loadMoreRecord();
});

const records = ref([]);
const currentPage = ref(1);

const loadMoreRecord = async () => {
  try {
    const result = await connect({
      method: "GET",
      url: `/record/search/${props.id}?currentPage=${currentPage.value++}`,
    })
    console.log(result);
    records.value.push(...result.data.attraction);
  } catch (error) {
    console.log(error);
  }  
}
</script>

<template>
  <div class="list scroll-view-container">
    <Record v-for="record in records" :key="record.recordKey" v-bind="record" @click="$emit('onSelectRecord', record.recordKey)"/>
  </div>
</template>

<style scoped>

</style>