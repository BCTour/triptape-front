<script setup>
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";
import TapeList from "@/components/tape/TapeList.vue"

const router = useRouter();
const userId = ref(localStorage.getItem("userId"));
const countReport = ref(1);
const attractions = ref([]);
const banners = ref([]);
const tapes = ref([]);
const banner = ref({
    title: "",
    description: "",
    tape: {
        tapeKey: ""
    }
})


onMounted(async () => {
    await getReport();
    await getBanner();
    await getPopularTape();
});

const getBanner = async () => {
    let url = `/banner/search`;
    try {
        const result = await connect({
            method: "GET",
            url: url,
        });
        banners.value = result.data.banner;
    } catch (error) {
        console.log(error);
    }
}

const getPopularTape = async () => {
    let url = `/tape/search/recent/10`;
    try {
        const result = await connect({
            method: "GET",
            url: url,
        });
        tapes.value = result.data.tape;
    } catch (error) {
        console.log(error);
    }
}


const getReport = async () => {
    let url = `/user/search/report?userId=${userId.value}&countReport=${countReport.value}`;
    try {
        const result = await connect({
            method: "GET",
            url: url,
        });
        banners.value = result.data.attraction;
    } catch (error) {
        console.log(error);
    }
}

const onClickAttraction = async (attraction) => {
    router.push({ name: 'attractionDetail', params: { id: attraction.attractionKey } })
}

const modifyAttraction = async (attraction) => {
    // 수정화면으로 넘어가게
}

const deleteAttraction = async (attractionKey) => {
    let url = `/attraction/delete/${attractionKey}/${userId.value}`;
    try {
        const result = await connect({
            method: "DELETE",
            url: url,
        });
    } catch (error) {
        console.log(error);
    }
}

const registBanner = async (banner) => {
    // 등록화면으로 넘어가게
}

const modifyBanner = async (banner) => {
    // 수정화면으로 넘어가게
}

const deleteBanner = async (bannerKey) => {
    let url = `/banner/delete/${userId.value}?bannerKey=${bannerKey}`;
    try {
        const result = await connect({
            method: "DELETE",
            url: url,
        });
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <h2>관리자 관리 화면</h2>
    <div class="admin">
        <div class="card banner">
            <div>
                <div>
                    <h2>배너 등록</h2>
                    <div class="input-box">
                        <label>제목</label>
                        <input v-model="banner.title" type="text" placeholder="배너에 들어갈 제목을 입력해주세요." />
                    </div>
                    <div class="input-box">
                        <label>설명</label>
                        <input v-model="banner.description" placeholder="배너에 들어갈 소개를 입력해주세요." />
                    </div>
                    <button>배너 등록</button>
                </div>

                <TapeList :tapes="tapes">

                </TapeList>
            </div>

            <div class="card" v-for="banner in banners" :key="banner.bannerKey">
                <div>
                    <h3>{{ banner.title }}</h3>
                    <p class="description">{{ banner.description }}</p>
                </div>
                <h3>테이프 정보</h3>
                <div>
                    <img v-if="!banner.tape.img.saveFile" src="../../assets/img/no_image.png">
                    <img v-else :src="banner.tape.img.saveFile" />
                    <div class="content">
                        <h3>{{ banner.tape.title }} </h3>
                        <p class="description">{{ banner.tape.description }}</p>
                    </div>
                </div>
                <button @click="modifyBanner(banner)">배너 수정</button>
                <button @click="deleteBanner(banner.bannerKey)">배너 삭제</button>
            </div>
        </div>
        <div class="card attraction">
            <h2>신고된 장소들</h2>
            <div class="card" v-for="attraction in attractions" :key="attraction.attractionKey">
                <div @click="onClickAttraction(attraction)">
                    <img v-if="!attraction.img.saveFile" src="../../assets/img/no_image.png">
                    <img v-else :src="attraction.img.saveFile" />
                    <div class="content">
                        <h3>{{ attraction.name }} </h3>
                        <p class="report">신고 횟수 : {{ attraction.report }}</p>
                        <p class="description">{{ attraction.description }}</p>
                    </div>
                </div>
                <button @click="modifyAttraction(attraction)">수정</button> <button
                    @click="deleteAttraction(attraction.attractionKey)">삭제</button>
            </div>
        </div>


    </div>
</template>

<style scoped>
.admin {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card {
    padding: 8px;
    margin-bottom: 12px;
    height: 100%;
}

.attraction {
    flex-direction: column;
}

img {
    height: 100%;
    width: 150px;
    min-width: 150px;
    object-fit: cover;
    border-radius: 12px;
}

.category {
    color: var(--caption-color);
    font-size: small;
}

.description {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 140%;
    font-size: smaller;
    margin-bottom: 8px;
}

.address {
    color: var(--caption-color);
    font-size: small;
}

.content {
    padding: 0px 8px;
}

textarea {
    height: 200px;
}

.input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
}
</style>