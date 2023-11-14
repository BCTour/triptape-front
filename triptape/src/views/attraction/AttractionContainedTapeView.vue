<script setup>
import AttractionMapList from '@/components/attraction/AttractionMapList.vue';
import SubHeading from '@/components/common/SubHeading.vue';
</script>

<template>
  <div>
    <div class="sub-heading-container">
      <SubHeading v-bind="{title: '테이프에 포함된 장소', description: '테이프 이름', isEnableBack: true}"/>
    </div>
    <AttractionMapList/>
  </div>
</template>

<style scoped>

</style>