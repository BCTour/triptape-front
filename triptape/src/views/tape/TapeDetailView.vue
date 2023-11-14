<script setup>
import { ref } from 'vue';
import RecordList from "@/components/tape/RecordList.vue";
import TapeInfo from "@/components/tape/TapeInfo.vue";
import AddRecordForm from '@/components/tape/AddRecordForm.vue';
import SubHeading from "@/components/common/SubHeading.vue";
</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '테이프 이름', description: '테이프 상세보기', isEnableBack: true}"/>
  </div>
  <div class="tape-detail">
    <div class="col">
      <RecordList />
    </div>
    <div class="col">
      <button class="primary-btn" @click="$router.push({name: 'attractionContainedTape'})">테이프에 포함된 장소 모아보기</button>
      <TapeInfo style="margin-bottom: 16px;"/>
      <AddRecordForm />
    </div>
  </div>
</template>

<style scoped>
.tape-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
.col {
  box-sizing: border-box;
  width: calc(50% - 16px);
  /* display: flex; */
  /* flex-direction: column; */
}

</style>