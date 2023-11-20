import { ref } from 'vue'
import { defineStore } from 'pinia'
import { connect } from "../util/access.js";

export const useLikeStore = defineStore('like', () => {

  const likeAttractions = ref([]);
  const likeTapes = ref([]);
  const likeRecords = ref([]);

  const loadLikedTape = async () => {
    try {
      const result = await connect({
        method: 'GET',
        url: `/user/like/tape?userId=${localStorage.getItem("userId")}`,
      })
      if (result.data.tape)
        likeTapes.value = result.data.tape.map((tape) => tape.tapeKey );
    } catch (error) {
      console.log(error);
    }
  }
  
  const loadLikedAttraction = async () => {
    try {
      const result = await connect({
        method: 'GET',
        url: `/user/like/attraction?userId=${localStorage.getItem("userId")}`,
      })
      if (result.data.attraction)
        likeAttractions.value = result.data.attraction.map((attraction)=>attraction.attractionKey);
    } catch (error) {
      console.log(error);
    }
  }
  
  const loadLikedRecord = async () => {
    try {
      const result = await connect({
        method: 'GET',
        url: `/user/like/record?userId=${localStorage.getItem("userId")}`,
      })
      if (result.data.record)
        likeRecords.value = result.data.record.map((record) => { return { recordKey: record.recordKey, tapeKey: record.tapeKey} });
    } catch (error) {
      console.log(error);
    }
  }

  const loadAll = async () => {
    await Promise.all([loadLikedAttraction(), loadLikedRecord(), loadLikedTape()]);
  }



  const isLikeRecord = (curTapeKey, curRecordKey) => {
    for (let i = 0; i < likeRecords.value.length; i++){
      if (likeRecords.value[i].tapeKey == curTapeKey && likeRecords.value[i].recordKey == curRecordKey) { return true; }
    }
    return false;
  }

  const isLikeTape = (curTapeKey) => {
    return likeTapes.value.includes(Number(curTapeKey));
  }

  const isLikeAttraction = (curAttractionKey) => {
    return likeAttractions.value.includes(curAttractionKey);
  }



  const checkLikeRecord = async (tapeKey, recordKey) => {
    try {
      const result = await connect({
        method: 'POST',
        url: `/record/like/${tapeKey}/${recordKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.request.status !== 409) return; // 409 conflict가 아니면 좋아요 불가
    }

    // 로컬 배열에 추가
    likeRecords.value.push({ tapeKey: Number(tapeKey), recordKey: Number(recordKey) });
  }
  const uncheckLikeRecord = async (tapeKey, recordKey) => {
    try {
      const result = await connect({
        method: 'DELETE',
        url: `/record/dislike/${tapeKey}/${recordKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }

    // 로컬 배열에서 제거
    for (let i = 0; i < likeRecords.value.length; i++) {
      if (likeRecords.value[i].tapeKey == tapeKey && likeRecords.value[i].recordKey == recordKey) {
        likeRecords.value.splice(i--, 1);
      }
    }
  }

  const checkLikeTape = async (tapeKey) => {
    console.log("like tape " + tapeKey);

    // 요청 전송
    try {
      const result = await connect({
        method: 'POST',
        url: `/tape/like/${tapeKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.request.status !== 409) return; // 409 conflict가 아니면 좋아요 불가
    }

    // 로컬 배열에 추가
    likeTapes.value.push(Number(tapeKey));
  }
  const uncheckLikeTape = async (tapeKey) => {
    console.log("dislike tape " + tapeKey);
    // 요청 전송
    try {
      const result = await connect({
        method: 'DELETE',
        url: `/tape/dislike/${tapeKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }
    // 로컬 배열에서 제거
    for (let i = 0; i < likeTapes.value.length; i++) {
      if (likeTapes.value[i] == tapeKey) { likeTapes.value.splice(i--, 1);}
    }
  }


  const checkLikeAttraction = async (attractionKey) => {
    // 요청 전송
    try {
      const result = await connect({
        method: 'POST',
        url: `/attraction/like/${attractionKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.request.status !== 409) return; // 409 conflict가 아니면 좋아요 불가
    }
    // 로컬 배열에 추가
    likeAttractions.value.push(attractionKey);
  }
  const uncheckLikeAttraction = async (attractionKey) => {
    // 요청 전송
    try {
      const result = await connect({
        method: 'DELETE',
        url: `/attraction/dislike/${attractionKey}/${localStorage.getItem("userId")}`
      })
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }

    // 로컬 배열에서 제거
    for (let i = 0; i < likeAttractions.value.length; i++) {
      if (likeAttractions.value[i] == attractionKey) { likeAttractions.value.splice(i--, 1); }
    }
  }


  return {
    loadLikedAttraction,
    loadLikedRecord,
    loadLikedTape,
    loadAll,

    likeAttractions,
    likeRecords,
    likeTapes,

    isLikeAttraction,
    isLikeRecord,
    isLikeTape,

    checkLikeAttraction,
    checkLikeRecord,
    checkLikeTape,

    uncheckLikeAttraction,
    uncheckLikeRecord,
    uncheckLikeTape,
  }
}, {
  persist: {
    enabled: true,
    strategies: [{strage: localStorage}],
  }
})