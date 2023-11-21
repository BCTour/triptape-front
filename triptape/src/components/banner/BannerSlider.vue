<script setup>
import { ref } from 'vue';
import BannerCard from "@/components/banner/BannerCard.vue";
import LeftIcon from "@/assets/icons/LeftIcon.vue";
import RightIcon from "@/assets/icons/RightIcon.vue";

const tape = ref({
  title: "test",
  description: "test",
  imgSrc: "https://images.dog.ceo/breeds/beagle/n02088364_10354.jpg",
})

// 배너 가져오는 요청

const index = ref(0);

// 아이콘 누르면 인덱스 옮겨주는 요청 (watch를 이용해서 tape값 자체를 바꿔주면 될 것 같음)

// 레코드 수정, 삭제
// 테이프 삭제
// 좋아요 누른 장소 리스트
// 좋아요 누른 레코드
// 핫 플레이스 리스트
// 테이프 그리드 내용 수정

</script>



<template>
  <div class="slider-container">
    <BannerCard v-bind="tape" style="z-index: 0;"/>
    <LeftIcon class="left-icon" @click=""/>
    <RightIcon class="right-icon"/>
  </div>
</template>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
}

.left-icon {
  position:absolute;
  top: 45%;
  fill: white;
  padding: 16px;
  left: 0px;
}

.right-icon {
  position: absolute;
  top: 45%;
  fill: white;
  padding: 16px;
  right: 0px;
}
</style>