<script setup>
import AttractionMapView from '@/views/attraction/AttractionMapView.vue';
import SubHeading from '@/components/common/SubHeading.vue';
</script>

<template>
  <div>
    <div class="sub-heading-container">
      <SubHeading v-bind="{title: '테이프에 포함된 장소', description: '테이프 이름', isEnableBack: true}"/>
    </div>
    <AttractionMapView/>
  </div>
</template>

<style scoped>

</style>