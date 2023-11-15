<script setup>
import { ref } from 'vue';
import TapeListItem from '@/components/tape/TapeListItem.vue';

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
</script>

<template>
  <div class="list scroll-view-container">
    <TapeListItem v-for="tape in tapes" :key="tapeKey" v-bind="tape"/>
  </div>
</template>

<style scoped>

</style>