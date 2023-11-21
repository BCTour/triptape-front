<script setup>
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";
import TapeList from "@/components/tape/TapeList.vue"
import AttractionItemList from "@/components/attraction/attractionItemList.vue"
import BannerItemList from "@/components/banner/BannerItemList.vue";

const router = useRouter();
const userId = ref(localStorage.getItem("userId"));
const countReport = ref(5);
const attractions = ref([]);
const banners = ref([]);
const tapes = ref([]);
const banner = ref({
    bannerKey: "",
    title: "",
    description: "",
    tape: {
        tapeKey: ""
    }
})
const selectedTape = ref({
    title: "",
});
const isModify = ref();

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
        attractions.value = result.data.attraction;
    } catch (error) {
        console.log(error);
    }
}

const deleteBanner = async () => {
    await getBanner();
}

const onClickAttraction = async (attraction) => {
    router.push({ name: 'attractionDetail', params: { id: attraction.attractionKey } })
}

const registBanner = async () => {
    let url = `/banner/regist/${userId.value}`;
    if (selectedTape.title == "") {
        alert("테이프를 선택해주세요");
        return;
    }
    try {
        const result = await connect({
            method: "POST",
            url: url,
            data: {
                title: banner.value.title,
                description: banner.value.description,
                tape: {
                    tapeKey: selectedTape.value.tapeKey
                }
            }
        });
        await getBanner();
    } catch (error) {
        if (error.request !== undefined && error.request.status === 409) {
            alert("이미 배너로 등록된 테이프입니다.")
        }
        console.log(error);
    }
}

const modifyBanner = async () => {
    let url = `/banner/modify/${userId.value}`;
    if (selectedTape.value == null) {
        alert("테이프를 선택해주세요");
        return;
    }
    try {
        const result = await connect({
            method: "PUT",
            url: url,
            data: {
                bannerKey: banner.value.bannerKey,
                title: banner.value.title,
                description: banner.value.description,
                tape: {
                    tapeKey: selectedTape.value.tapeKey
                }
            }
        });
        await getBanner();

        banner.value.title = null;
        banner.value.description = null;
        banner.value.bannerKey = null;
        banner.value.tape = null;

        selectedTape.value = null;
        isModify.value = 0;
    } catch (error) {
        if (error.request !== undefined && error.request.status === 409) {
            alert("이미 배너로 등록된 테이프입니다.")
        }
        console.log(error);
    }
}

const onClickBanner = (data, idx) => {
    isModify.value = idx;
    if (isModify.value != 0) {
        banner.value = data;
        selectedTape.value = data.tape;
    }
}

const onClickTape = (tapeKey) => {
    for (let i in tapes.value) {
        if (tapes.value[i].tapeKey == tapeKey) {
            selectedTape.value = tapes.value[i];
        }
    }
    console.log(selectedTape.value)
}


</script>

<template>
    <div class="admin">
        <h2>관리자 관리 화면</h2>
        <div class="card banner">
            <div class="bannerInput">
                <h3>배너 등록</h3>
                <h4 v-if="isModify">#{{ isModify }} 수정</h4>
                <div class="input-box">
                    <label>제목</label>
                    <input v-model="banner.title" type="text" placeholder="배너에 들어갈 제목을 입력해주세요." />
                </div>
                <div class="input-box">
                    <label>설명</label>
                    <input v-model="banner.description" placeholder="배너에 들어갈 소개를 입력해주세요." />
                </div>
                <div class="input-box">
                    <label>등록할 테이프명</label>
                    <input v-model="selectedTape.title" />
                </div>
                <button class="primary-btn" v-if="!isModify" @click="registBanner">배너 등록</button>
                <button class="primary-btn" v-if="isModify" @click="modifyBanner">배너 수정</button>
                <button class="primary-btn" style="margin-left: 5px;" v-if="isModify" @click="onClickBanner">등록으로
                    전환</button>
                <hr>
                <h3>배너 목록</h3>
                <BannerItemList :banners="banners" @onClickItem="onClickBanner" @deleteBanner="deleteBanner">
                </BannerItemList>
            </div>
            <div class="bannerTape">
                <TapeList :tapes="tapes" @on-click-item="onClickTape"></TapeList>
            </div>
        </div>

        <div class="card attraction">
            <h3>신고된 장소들</h3>
            <AttractionItemList :attractions="attractions" @on-click-item="onClickAttraction" />
        </div>
    </div>
</template>

<style scoped>
.card {
    padding: 15px;
    margin-bottom: 12px;
}

.input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
}

.admin {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.banner {
    flex-direction: row;
}

.bannerInput {
    width: 50%;
}

.bannerTape {
    width: 50%;
}
</style>