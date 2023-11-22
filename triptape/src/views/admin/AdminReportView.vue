<script setup>
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";

const router = useRouter();
const countReport = ref(5);
const userId = ref(localStorage.getItem("userId"));
const attractions = ref([]);
onMounted(async () => {
    await getReport();
});

const getReport = async () => {
    let url = `/user/search/report?userId=${userId.value}&countReport=${countReport.value}`;
    try {
        const result = await connect({
            method: "GET",
            url: url,
        });
        attractions.value = result.data.attraction;
    } catch (error) {
        console.log(error);
    }
}

const onClickAttraction = async (attraction) => {
    router.push({ name: 'attractionDetail', params: { id: attraction.attractionKey } })
}

</script>

<template>
	<div class="card attraction">
		<h2>신고된 장소들</h2>
		<AttractionItemList :attractions="attractions" @on-click-item="onClickAttraction" />
	</div>
</template>

<style scoped>
h2 {
	padding: 16px;
}
.card {
	box-sizing: border-box;
	width: 100%;
    margin-bottom: 12px;
}

.banner {
    flex-direction: row;
}

</style>