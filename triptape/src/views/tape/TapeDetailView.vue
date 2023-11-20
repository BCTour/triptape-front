<script setup>
import { ref, onMounted } from 'vue';
import RecordList from "@/components/tape/RecordList.vue";
import TapeInfo from "@/components/tape/TapeInfo.vue";
import CreateRecordForm from '@/components/tape/CreateRecordForm.vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from '@/util/access';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedRecord = ref(null);


onMounted(async () => {
  try {
    const result = await connect({
      method: "GET",
      url: `/tape/search/info/${route.params.id}`,
    })
    console.log(result);
    tape.value = result.data.tape;
  } catch (error){
    console.log(error);
  }

  await onLoadMoreRecord();
})

const tape = ref({});

const records = ref([]);
const recordPage = ref(1);

const onLoadMoreRecord = async () => {
  try {
    const result = await connect({
      method: "GET",
      url: `/record/search/${route.params.id}?currentPage=${recordPage.value++}`,
    })
    console.log(result);
    if (result.data) records.value.push(...result.data.record);
    console.log(records.value);
  } catch (error) {
    console.log(error);
  } 
}

const onSelectRecord = (recordNum) => {
  selectedRecord.value = recordNum;
}

const onUnselectRecord = () => {
  selectedRecord.value = null;
}

const reloadRecord = async () => {
  recordPage.value = 1;
  records.value = [];
  await onLoadMoreRecord();
}

const onClickLike = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }  
}

</script>



<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: tape.title, description: '테이프 상세보기', isEnableBack: true}"/>
  </div>
  <div class="tape-detail">
    <div class="col">
      <RecordList
        :id="$route.params.id"
        :records="records"
        @on-select-record="onSelectRecord"
        @on-load-more="onLoadMoreRecord"
      />
    </div>
    <div class="col">
      <button class="primary-btn" @click="$router.push({name: 'attractionContainedTape'})">테이프에 포함된 장소 모아보기</button>
      <TapeInfo class="tape-info" v-bind="tape"/>
      <CreateRecordForm 
        :selectedRecord="selectedRecord"
        @on-unselect-record="onUnselectRecord"
        @on-write-record="reloadRecord"
      />
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

.tape-info {
  margin-bottom: 16px;
}
</style>