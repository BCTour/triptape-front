<script setup>
import { ref } from 'vue';
import RecordList from "@/components/tape/RecordList.vue";
import TapeInfo from "@/components/tape/TapeInfo.vue";
import AddRecordForm from '@/components/tape/AddRecordForm.vue';

</script>

<template>
  <div class="tape-detail">
    <div class="col">
      <RecordList />
    </div>
    <div class="col">
      <TapeInfo/>
      <AddRecordForm />
    </div>
  </div>
</template>

<style scoped>
.tape-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
.col {
  box-sizing: border-box;
  width: calc(50% - 16px);
  /* display: flex; */
  /* flex-direction: column; */
}

</style>