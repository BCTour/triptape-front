<script setup>
import { ref } from 'vue'
import { connect } from '@/util/access.js';
import BannerItem from "./BannerItem.vue";

defineProps({
    banners: Array
});

const userId = ref(localStorage.getItem("userId"));
const emit = defineEmits(['onClickItem', 'deleteBanner']);

const onClickItem = async (banner, idx) => {
    emit('onClickItem', banner, idx + 1);
}

const onDeleteBanner = async (bannerKey) => {
    let url = `/banner/delete/${userId.value}?bannerKey=${bannerKey}`;
    try {
        const result = await connect({
            method: "DELETE",
            url: url,
        });
        emit('deleteBanner');
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="list">
        <div v-if="banners == null || banners.length == 0" class="no-content">등록된 배너가 없습니다.</div>
        <div v-for="(banner, idx) in banners" :key="banner.bannerKey" class="card reactive">
            <!-- <BannerItem :="banner" :idx="idx" @click="onClickItem(banner, idx)" /> -->
            <BannerItem :="banner" :idx="idx"/>
            <div class="row">
                <button class="primary-outline-btn" @click="onClickItem(banner, idx)">배너 수정</button>
                <button class="primary-btn" @click="onDeleteBanner(banner.bannerKey)">배너 삭제</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
.card {
    padding: 8px;
    background-color: #EEEEEE;
    margin-bottom: 16px;
}
button {
    margin-left: 8px;
    padding-left: 16px;
    padding-right: 16px;
}
</style>