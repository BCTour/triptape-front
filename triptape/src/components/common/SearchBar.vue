<script setup>
import { ref } from 'vue';
import SearchIcon from "@/assets/icons/SearchIcon.vue";

defineProps({
  options: Array
})

const category = ref("");
const searchText = ref("");

</script>

<template>
  <div class="search-bar">
    <select v-model="category">
      <option value="" disabled>검색 조건</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
    <input type="text" v-model="searchText" />
    <SearchIcon class="icon search-icon" @click="$emit('onClickSearch', category, searchText)"/>
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