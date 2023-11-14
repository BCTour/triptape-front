<script setup>
import { ref } from 'vue';
import Record from "@/components/tape/Record.vue";

defineProps({

})

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
  {
    recordKey: "4",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "5",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "6",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "7",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "8",
    createtime: "2023-01-01 00:00:00",
    content: "안녕하세요????? 안녕하십니까?????",
    img: "dog.png",
    attractionKey: "1",
    userKey: "1",
    parentRecordKey: "13",
  },
  {
    recordKey: "9",
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
  <div class="list scroll-view-container">
    <Record v-for="record in records" :key="record.recordKey" v-bind="record"/>
  </div>
</template>

<style scoped>

</style>