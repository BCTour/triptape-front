<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CommentContainer from '@/components/common/CommentContainer.vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeList from "@/components/tape/TapeList.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import axios from "axios";

const route = useRoute();

const imgSrc = ref("");
const address = ref("");
const typeName = ref("");
const title = ref("");
const description = ref("");

onMounted(async () => {
  try {
    const result = await axios({
      url: `http://localhost:8080/attraction/info/${route.params.id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      }
    });
    console.log(result);
    address.value = result.data.address;
    typeName.value = result.data.attractionType.typeName;
    title.value = result.data.name;
    description.value = result.data.description;
    imgSrc.value = result.data.img.saveFile;
  } catch (error) {
    console.log(error);
  }
});
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
      <KakaoMap/>
    </div>
    <div class="card tape-container">
      <TapeList/>
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
}
</style>