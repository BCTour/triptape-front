<script setup>
import { ref } from 'vue';
import AttractionItem from "@/components/attraction/AttractionItem.vue";

const attractions = ref([
  {
    attractionKey: 1,
    type_code: 35,
    name: "제목1",
    description: "상세내용1",
    address: "경기도 파주시 문산읍",
    img: "asdf.png",
  },
  {
    attractionKey: 2,
    type_code: 35,
    name: "제목2",
    description: "상세내용2",
    address: "경기도 파주시 교하동",
    img: "asdf.png",
  },
  {
    attractionKey: 3,
    type_code: 35,
    name: "제목3",
    description: "상세내용3",
    address: "서울특별시 강남구 테헤란로",
    img: "asdf.png",
  },
  {
    attractionKey: 4,
    type_code: 35,
    name: "제목1",
    description: "상세내용1",
    address: "경기도 파주시 문산읍",
    img: "asdf.png",
  },
  {
    attractionKey: 5,
    type_code: 35,
    name: "제목2",
    description: "상세내용2",
    address: "경기도 파주시 교하동",
    img: "asdf.png",
  },
  {
    attractionKey: 6,
    type_code: 35,
    name: "제목3",
    description: "상세내용3",
    address: "서울특별시 강남구 테헤란로",
    img: "asdf.png",
  },
  {
    attractionKey: 7,
    type_code: 35,
    name: "제목1",
    description: "상세내용1",
    address: "경기도 파주시 문산읍",
    img: "asdf.png",
  },
  {
    attractionKey: 8,
    type_code: 35,
    name: "제목2",
    description: "상세내용2",
    address: "경기도 파주시 교하동",
    img: "asdf.png",
  },
  {
    attractionKey: 3,
    type_code: 35,
    name: "제목3",
    description: "상세내용3",
    address: "서울특별시 강남구 테헤란로",
    img: "asdf.png",
  },
])

</script>

<template>
  <div class="list scroll-view-container">
    <AttractionItem v-for="attraction in attractions" :key="attraction.attractionKey" v-bind="attraction" @click="$router.push({name: 'attractionDetail', params:{id: attraction.attractionKey}})"/>
  </div>
</template>

<style scoped>


</style>