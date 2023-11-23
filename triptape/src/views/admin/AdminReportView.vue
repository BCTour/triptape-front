<script setup>
import { ref, onMounted, computed} from 'vue';
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
        // console.log(result);
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
        <div class="container">
            <div class="card report-num">
                <h3 style="margin-right: 8px">신고 횟수 기준</h3><span style="margin-right: 16px" class="caption">신고 횟수가 입력값 이상인 장소만 검색됩니다</span>
                <div class="row"><input type="number" v-model="countReport"  min="1"><button class="primary-btn" @click="getReport">검색</button></div>
            </div>
            <AttractionItemList :attractions="attractions" @on-click-item="onClickAttraction" />
        </div>
	</div>
</template>

<style scoped>
h2 {
	padding: 16px;
}
.report-num{
    padding: 16px;
}
.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
}
.card {
	box-sizing: border-box;
	width: 100%;
    margin-bottom: 12px;
}
.container {
    padding: 0 16px 0 16px;
}
.banner {
    flex-direction: row;
}
button {
    padding-left: 16px;
    padding-right: 16px;
}

</style>