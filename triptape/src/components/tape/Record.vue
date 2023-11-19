<script setup>
import { ref } from 'vue';
defineProps({
  recordKey: Number,
  createtime: String,
  content: String,
  img: Object,
  attractionKey: Number,
  user: Object,
  attraction: Object,
  parentRecordKey: Number,
})

</script>

<template>
  <div class="card reactive record-container">
    <p class="caption">#{{ recordKey }}  <span v-if="parentRecordKey">/ <span class="parent-num">#{{ parentRecordKey }}</span>에 대한 답글</span></p>
    <p class="content">{{content}}</p>
    <img v-if="img" :src="img.saveFile">
    <div class="card reactive attraction-container" v-if="attraction" @click.stop="$router.push({name: 'attractionDetail', params: {id: attraction.attractionKey}})">
      <h4>{{attraction.name }}</h4>
      <p class="caption">{{ attraction.address }}</p>
    </div>
    <p class="caption">@{{ user.userId }} | {{createtime}}</p>
  </div>
</template>

<style scoped>
.key {
  margin-bottom: 16px;
}
.content{
  margin: 4px 0px 16px 0px;
}
.parent-num{
  color: rgb(36, 140, 226)
}
.record-container {
  padding: 24px;
  margin-bottom: 12px;
}
.attraction-container{
  padding: 16px;
  margin-bottom: 8px;
}

img {
  /* max-height: 150px; */
  /* max-width: 100%; */
  height: auto;
  width: auto;
}
</style>