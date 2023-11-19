<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import TapeGridItem from "@/components/tape/TapeGridItem.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access";

const props = defineProps({
	tapes: Array,
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
    <TapeGridItem v-for="tape in tapes" :key="tape.tapeKey" v-bind="tape" @click="router.push({name: 'tapeDetail', params: {id: tape.tapeKey}})"/> 
  </div>
</template>

<style scoped>
.grid-wrap {
	overflow-x: auto;
	display: flex;
	flex-direction: row;
}
</style>