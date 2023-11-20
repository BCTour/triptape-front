<script setup>
import { ref, onMounted} from 'vue';
import TapeListItem from '@/components/tape/TapeListItem.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  // attractionId: Number,
  tapes: Array,
})

// onMounted( async () => {
//   try {
//     const result = await connect({
//       method: "GET",
//       url: `/tape/include/attraction?attractionKey=${route.params.id}`,
//     })
//     console.log("result");
//     if (result.data) tapes.value = result.data.tape;
//   } catch (error) {
//     console.log(error);
//   }
// })

// const tapes = ref([])
const emit = defineEmits(["onClickItem"]);
const onClickItem = (key) => {
  emit("onClickItem", key);
}
</script>

<template>
  <div class="list scroll-view-container">
    <TapeListItem v-for="tape in tapes" :key="tapeKey" v-bind="tape" @on-click-item="onClickItem"/>
  </div>
</template>

<style scoped>

</style>