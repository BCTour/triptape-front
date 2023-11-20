<script setup>

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CommentContainer from '@/components/common/CommentContainer.vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeList from "@/components/tape/TapeList.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import axios from "axios";
import {connect} from "@/util/access.js";
import { storeToRefs } from 'pinia';
import { useLikeStore } from "@/stores/like";

const like = useLikeStore();
const { likeAttractions, likeTapes, likeRecords } = storeToRefs(like);
const route = useRoute();
const router = useRouter();

const imgSrc = ref("");
const address = ref("");
const typeName = ref("");
const title = ref("");
const description = ref("");
const attraction = ref({});

const tapes = ref([]);

onMounted(async () => {
  // 장소 상세 정보 조회
  try {
    const result = await connect({
      url: `/attraction/info/${route.params.id}`
    })
    console.log(result);
    attraction.value = result.data;
    address.value = result.data.address;
    typeName.value = result.data.attractionType.typeName;
    title.value = result.data.name;
    description.value = result.data.description;
    imgSrc.value = result.data.img.saveFile;
  } catch (error) {
    console.log(error);
  }

  // 테이프 리스트 조회
  try {
    const result = await connect({
      method: 'GET',
      url: `/tape/include/attraction?attractionKey=${route.params.id}`,
    })
    tapes.value = result.data.tape;
    console.log(result.data.tape);
    console.log(tapes.value);
  } catch (error) {
    console.log(error);
  }
});

const onClickTapeItem = (tapeKey) => {
  router.push({name: 'tapeDetail', params: {id: tapeKey}})
}
</script>


<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '장소 상세', description: title, isEnableBack: true}"/>
  </div>
  <div class="detail-container">
    <div class="card info-container">
      <img v-if="imgSrc" class="attraction-img" :src="imgSrc">
      <img v-else class="attraction-img" src="@/assets/img/no_image.png">
      <p class="caption">{{ typeName }}</p>
      <h2>{{title}}</h2>
      <p class="address">{{address}}</p>
      <p class="description">{{description}}</p>
      <KakaoMap :attractions="[attraction]"/>
    </div>
    <div class="card tape-container">
      <h3>이 장소가 포함되어있는 테이프</h3>
      <TapeList v-if="tapes.length > 0" :tapes="tapes" @on-click-item="onClickTapeItem"/>
      <div v-else class="caption no-content">포함된 테이프가 없습니다.</div>
    </div>
    <CommentContainer />
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: row;
  height: 700px;
}
.info-container {
  padding: 16px;
}
.comment-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card {
  flex: 1;
  margin-right: 8px;
}

p {
  margin-bottom: 8px;
}

.attraction-img {
  height: 200px;
  object-fit: cover;
}
.address {
  font-size: 14px;
}

.description {
  line-height: 150%;
  overflow-y: auto;
  height: 200px;
}

.no-content {
  display: flex;
	width: 100%;
	height: 100%;
	/* text-align: center; */
	align-items: center;
	justify-content: center;
}

h3 {
  margin: 16px 16px 8px 16px;
}
</style>