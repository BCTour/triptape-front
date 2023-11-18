<script setup>
import { ref, onMounted} from 'vue';
import TapeListItem from '@/components/tape/TapeListItem.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  attractionId: Number,
})

onMounted( async () => {
  try {
    const result = await connect({
      method: "GET",
      url: `/tape/include/attraction?attractionKey=${route.params.id}`,
    })
    console.log("result");
  } catch (error) {
    console.log(error);
  }
})

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
</script>

<template>
  <div class="list scroll-view-container">
    <TapeListItem v-for="tape in tapes" :key="tapeKey" v-bind="tape"/>
  </div>
</template>

<style scoped>

</style>