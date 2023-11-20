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

  const isLikeRecord = (tapeKey, recordKey) => {
    for (let record in likeRecords) {
      if (record.tapeKey == tapeKey && record.recordKey == recordKey) { return true; }
    }
    return false;
  }

  const isLikeTape = (tapeKey) => {
    for (let tape in likeTapes) {
      if (tape.tapeKey == tapeKey) { return true; }
    }
    return false;
  }

  const isLikeAttraction = (attractionKey) => {
    for (let attraction in likeAttractions) {
      if (attraction.attractionKey == attractionKey) { return true; }
    }
    return false;
  }

  const checkLikeRecord = (tapeKey, recordKey) => {
    likeRecords.value.push({ tapeKey: tapeKey, recordKey: recordKey });
  }

  const checkLikeTape = (tapeKey) => {
    likeTapes.value.push(tapeKey);
  }

  const checkLikeAttraction = (attractionKey) => {
    likeAttractions.value.push(attractionKey);
  }

  const unLikeRecord = (tapeKey, recordKey) => {
    for (let i = 0; i < likeRecords.value.length; i++) {
      if (likeRecords.value[i].tapeKey == tapeKey && likeRecords.value[i].recordKey == recordKey) {
        likeRecords.value.splice(i--, 1);
      }
    }
  }

  const unLikeTape = (tapeKey) => {
    for (let i = 0; i < likeTapes.value.length; i++) {
      if (likeTapes.value[i].tapeKey == tapeKey) {
        likeTapes.value.splice(i--, 1);
      }
    }
  }

  const unLikeAttraction = (attractionKey) => {
    for (let i = 0; i < likeAttractions.value.length; i++) {
      if (likeAttractions.value[i].attractionKey == attractionKey) {
        likeAttractions.value.splice(i--, 1);
      }
    }
  }


  return {
    loadLikedAttraction,
    loadLikedRecord,
    loadLikedTape,

    likeAttractions,
    likeRecords,
    likeTapes,

    isLikeAttraction,
    isLikeRecord,
    isLikeTape,

    checkLikeAttraction,
    checkLikeRecord,
    checkLikeTape,

    unLikeAttraction,
    unLikeRecord,
    unLikeTape,
  }
})