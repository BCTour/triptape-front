<script setup>
import { RouterView } from "vue-router";
import SubHeading from "@/components/common/SubHeading.vue";
import SearchBar from "@/components/common/SearchBar.vue";
</script>

<template>
  <div>
    <div class="sub-heading-container">
      <SubHeading v-bind="{title: '관광지 목록 조회', description: '등록된 관광지 목록을 지도에 표시합니다.'}"/>
      <SearchBar />
    </div>
    <RouterView/>
  </div>
</template>

<style scoped>

</style>