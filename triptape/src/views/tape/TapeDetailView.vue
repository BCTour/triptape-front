<script setup>
import { ref } from 'vue';
import RecordList from "@/components/tape/RecordList.vue";
import TapeInfo from "@/components/tape/TapeInfo.vue";

const records = ref([
  {
    recordKey: "1",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "2",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "3",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
])
</script>

<template>
  <div class="tape-detail">
    <div class="col">
      <RecordList v-for="record in records" :key="record.recordKey"/>
    </div>
    <div class="col">
      <TapeInfo/>
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