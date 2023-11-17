<script setup>
import { ref, onMounted } from 'vue';
import DownIcon from "@/assets/icons/DownIcon.vue";
const emit = defineEmits(["onObserved"])
const observe = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log("observed")
      emit("onObserved")
    });
  });

  observer.observe(observe.value);
});
</script>

<template>
  <div class="observer" ref="observe">
    <DownIcon />
  </div>
</template>

<style scoped>
.observer{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>