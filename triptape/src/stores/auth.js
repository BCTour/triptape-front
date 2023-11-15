import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from "@/util/http-commons.js";
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
  const isLogined = ref(false);
  const user = ref({
    id : null,
    token: null,
    name: null,
  });

  const login = async (id, pw) => {
    const testId = "ssafy";
    const testPw = "ssafy";
    const testToken = "aaaa";
    /**
     * TO-DO : axios.post로 로그인 수행
     * 지금은 test용으로 ssafy만 입력하면 로그인 성공하게 해두었음
     */
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:8080/user/login",
        mode: "cors",
        data: {
          userId: id,
          userPw: pw,
        }
      });
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    
    // if (result.data.status){
    //   user.value.id = id;
    //   user.value.token = testToken;
    //   user.value.name = "김싸피";

    //   isLogined.value = true;
    //   return true;
    // } else {
    //   return false;
    // }
  }

  function logout() {
    user.value.id = null;
    user.value.token = null;
    user.value.name = null;

    isLogined.value = false;
  }

  return {
    isLogined, user,
    login, logout,
  }
})

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })
