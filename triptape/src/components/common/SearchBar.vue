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
  <div class="box">
    <select v-model="category">
      <option value="" disabled>검색 조건</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
    <input type="text" v-model="searchText" />
    <SearchIcon class="search-icon" @click="$emit('onClickSearch', category, searchText)"/>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.search-icon {
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 12px;
  margin-left: 8px;
}
.search-icon:hover {
  background-color: #BBBBBB;
  cursor: pointer;
}

select {
  border-radius: 24px 0px 0px 24px;
}

input {
  border-radius: 0px 24px 24px 0px;
}

</style>