<script setup>
import { ref, onMounted } from 'vue';
import BannerItem from "./BannerItem.vue";
import { connect } from '@/util/access.js';
const banners = ref([]);

onMounted(async () => {
    await getBanner();
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
</script>

<template>
    <div class="list">
        <div v-if="banners.length == 0" class="no-content">등록된 배너가 없습니다.</div>
        <BannerItem v-for="banner, idx in banners" :key="banner.bannerKey" :="banner" :idx="idx"
            @click="$emit('onClickBanner', banner, idx + 1)">
        </BannerItem>
    </div>
</template>

<style scoped></style>