<script setup>
import { ref } from 'vue';
import SearchIcon from "@/assets/icons/SearchIcon.vue";

defineProps({
  options: Array,
  isEnableType: Boolean,
})

const category = ref(null);
const searchText = ref("");
const type = ref(null);

const typeOptions = ref([
  { name: "장소 분류", value: null },
  { name: "관광지",    value: 1 },
  { name: "문화시설",  value: 2 },
  { name: "여행코스",  value: 3 },
  { name: "레포츠",    value: 4 },
  { name: "숙박",      value: 5 },
  { name: "쇼핑",      value: 6 },
  { name: "음식점",    value: 7 },
])
</script>

<template>
  <div class="search-bar">
    <select v-if="isEnableType" v-model="type">
      <option v-for="typeOption in typeOptions" :value="typeOption.value">{{ typeOption.name }}</option>
    </select>
    <select v-model="category">
      <option :value="null">검색 조건</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
    <input type="text" v-model="searchText" />
    <SearchIcon class="icon search-icon" @click="$emit('onClickSearch', category, searchText, type)"/>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.search-icon {
  width: 24px;
  height: 24px;
  /* padding: 8px; */
  margin-left: 8px;
}

select {
  border-radius: 18px 0px 0px 18px;
  height: 36px;
}

input {
  border-radius: 0px 18px 18px 0px;
  height: 36px;
}

</style>