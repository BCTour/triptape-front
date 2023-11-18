<script setup>
import AttractionMapList from '@/components/attraction/AttractionMapList.vue';
import SubHeading from '@/components/common/SubHeading.vue';
import {ref} from 'vue';
import {connect} from '@/util/access.js';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const page = ref(1);
const attractions = ref([]);

const loadAttractions = async () => {
  try {
    const result = await connect({
      url: `/record/attraction?tapeKey=${route.params.id}&currentPage=${page.value++}`,
      method: "GET",
    })
    console.log(result);
    if (result.data.attraction) attractions.value.push(...result.data.attraction);
  } catch (error) {
    console.log(error);
  }
}

const onClickItem = async (attraction) => {
  // console.log(attractionId);
  router.push({name: 'attractionDetail', params:{id: attraction.attractionKey}});
}

</script>

<template>
  <div>
    <div class="sub-heading-container">
      <SubHeading v-bind="{title: '테이프에 포함된 장소', description: '테이프 이름', isEnableBack: true}"/>
    </div>
    <AttractionMapList 
      :attractions="attractions" 
      @on-load-more="loadAttractions"
      @on-click-item="onClickItem"
    />
  </div>
</template>

<style scoped>

</style>