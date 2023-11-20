import { ref } from 'vue'
import { defineStore } from 'pinia'
import { connect } from "../util/access.js";

export const useLikeStore = defineStore('like', () => {
  
}, {
  persist: {
    enabled: true,
    strategies: [{strage: localStorage}],
  }
})