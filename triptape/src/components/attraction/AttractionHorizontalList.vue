<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import AttractionGridItem from "@/components/attraction/AttractionGridItem.vue";
import { connect } from "@/util/access";

const props = defineProps({
	attractions: Array,
})

const router = useRouter();
const currentPage = ref(1);

onMounted( async () => {

});

const searchOptions = ref([
  { name: "제목", value: "title" },
  { name: "설명", value: "description" },
  { name: "작성자", value: "userId" },  
])

</script>


<template>
  <div class="grid-wrap">
    <AttractionGridItem
      v-for="attraction in attractions" :key="attraction.attractionKey"
      v-bind="attraction"
      @click="router.push({name: 'attractionDetail', params: {id: attraction.attractionKey}})"
    /> 
  </div>
</template>

<style scoped>
.grid-wrap {
	overflow-x: auto;
	display: flex;
	flex-direction: row;
}
</style>