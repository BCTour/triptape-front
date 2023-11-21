<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import TapeGridItem from "@/components/tape/TapeGridItem.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access";
import { storeToRefs } from 'pinia';

const router = useRouter();
const currentPage = ref(1);

onMounted( async () => {
  await getTapes();
});

const getTapes = async (keyword, word) => {
  let url = "/tape/search?currentPage=1";
  if (keyword !== undefined) url += `&keyword=${keyword}&word=${word}`;
  try {
    const result = await connect({
      method: "GET",
      url: url,
    });
    console.log(result);
    tapes.value = result.data.tape;
  } catch (error) {
    console.log(error);
  }
}

const tapes = ref([]);

const searchOptions = ref([
  { name: "제목", value: "title" },
  { name: "설명", value: "description" },
  { name: "작성자", value: "userId" },  
])

const onClickSearch = async (category, text) => {
  await getTapes(category, text);
}

</script>


<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '테이프', description: '현재 진행중인 테이프입니다'}"/>
    <SearchBar :options="searchOptions" @on-click-search="onClickSearch"/>
  </div>
  <button class="primary-btn" @click="$router.push({name: 'createTape'})">+ 새로운 테이프 만들기</button>
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