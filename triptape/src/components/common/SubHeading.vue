<script setup>
import BackIcon from "@/assets/icons/BackIcon.vue";
defineProps({
  title: String,
  description: String,
  isEnableBack: Boolean,
})


</script>

<template>
  <div class="sub-heading">
    <BackIcon class="icon back-icon" v-if="isEnableBack" @click="$router.go(-1)"/>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.sub-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
}
h1 {
  margin-bottom: 0px;
}
p {
  margin-left: 16px;
}

.back-icon {
  width: 36px;
  height: 36px;
}

</style>