<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import TapeGridItem from "@/components/tape/TapeGridItem.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import SubHeading from "@/components/common/SubHeading.vue";

const router = useRouter();

const tapes = ref([
  {
    title: "Title",
    tapeKey: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc leo, finibus nec auctor vel, pharetra quis lectus. Phasellus aliquam massa eget neque porttitor, eu finibus enim vulputate. Nulla facilisi. Morbi euismod purus enim. Phasellus congue mauris a sapien fermentum tristique. Donec lorem dolor, egestas in magna sed",
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
  <div class="header">
    <SubHeading v-bind="{title: '테이프', description: '현재 진행중인 테이프입니다'}"/>
    <SearchBar :options="searchOptions" @on-click-search="onClickSearch"/>
  </div>
  <div class="grid-wrap">
    <TapeGridItem v-for="tape in tapes" :key="tape.tapeKey" v-bind="tape" @click="router.push({name: 'tapeDetail', params: {id: tape.tapeKey}})"/> 
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.grid-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>