<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import TapeGridItem from "@/components/tape/TapeGridItem.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import Observer from "@/components/common/Observer.vue";
import { connect } from "@/util/access";
import { storeToRefs } from 'pinia';

const router = useRouter();
const currentPage = ref(1);

// 검색을 위한 옵션을 저장
const keyword = ref(null);
const word = ref(null);

onMounted(async () => {
  await loadTapes();
  // await getTapes();
});


const loadTapes = async () => {
  let url = `/tape/search?currentPage=${currentPage.value++}`;
  if (keyword.value) url += `&keyword=${keyword.value}&word=${word.value}`;
  try {
    const result = await connect({
      method: "GET",
      url: url,
    });
    console.log(result);
    if (result.data.tape) {
      tapes.value.push(...result.data.tape)
      console.log(tapes);
    }
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
  currentPage.value = 1;
  tapes.value = [];

  keyword.value = category;
  word.value = text;
  await loadTapes();
  // await getTapes(category, text);
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
    <div style="flex: 1; min-width: 300px; margin: 16px; padding: 8px"></div>
    <div style="flex: 1; min-width: 300px; margin: 16px; padding: 8px"></div>
    <div style="flex: 1; min-width: 300px; margin: 16px; padding: 8px"></div>
    <Observer @on-observed="loadTapes"/>
  </div>
</template>

<style scoped>
.grid-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>