<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import TapeGridItem from "@/components/tape/TapeGridItem.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import SubHeading from "@/components/common/SubHeading.vue";

const router = useRouter();

const tapes = ref([
  {
    title: "대전 빵 여행",
    tapeKey: 5,
    description: "대전하면 흔히들 성심당 생각하시는데, 사실 빵향평준화가 이루어져서 일반 빵집들도 되게 맛있는 곳들이 많데요! 그런고로 좋은 빵집들 함께 공유해요 여러분",
    img: "https://images.dog.ceo/breeds/appenzeller/n02107908_599.jpg",
  },
  {
    title: "강아지 너무 귀여워",
    tapeKey: 56,
    description: "강아지 정말 짱 귀여워! 리트리버 너무 귀여워! 우리 집에 가자 귀여운 조구만 강아지야!!아니생략 언ㄷ제되는데",
    img: "https://images.dog.ceo/breeds/retriever-golden/n02099601_816.jpg",
  },
])

const searchOptions = ref([
  { name: "제목", value: "title" },
  { name: "설명", value: "description" },
  { name: "작성자", value: "userId" },  
])
const onClickSearch = (category, text) => {
  console.log(category + " " + text)
}

</script>


<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '테이프', description: '현재 진행중인 테이프입니다'}"/>
    <SearchBar :options="searchOptions" @on-click-search="onClickSearch"/>
  </div>
  <div class="grid-wrap">
    <TapeGridItem v-for="tape in tapes" :key="tape.tapeKey" v-bind="tape" @click="router.push({name: 'tapeDetail', params: {id: tape.tapeKey}})"/> 
  </div>
</template>

<style scoped>
.grid-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>