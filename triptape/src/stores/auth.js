import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from "@/util/http-commons.js";
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
  const isLogined = ref(false);

  const user = ref({
    id : null,
    name: null,
  });

  const refreshToken = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:8080/user/refresh",
        mode: "cors",
        header: {
          refreshToken : user.value.refreshToken,
        }
      })
    } catch (error) {
      
    }
  }

  const login = async (id, pw) => {
    /**
     * TO-DO : axios.post로 로그인 수행
     * 지금은 test용으로 ssafy만 입력하면 로그인 성공하게 해두었음
     */
    try {
      const result = await http({
        method: "POST",
        url: "/user/login",
        mode: "cors",
        data: {
          userId: id,
          userPw: pw,
        }
      });
      isLogined.value = true;
      user.value.id = id;
      
      localStorage.setItem("access-token", result.data["access-token"]);
      localStorage.setItem("refresh-token", result.data["refresh-token"]);
      
      await getUserInfo();

      return true;
    } catch (error) {
      console.log(error);
      isLogined.value = false;
      return false;
    }
  }

  function logout() {
    user.value.id = null;
    user.value.name = null;

    isLogined.value = false;
  }

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("access-token");
      const result = await axios({
        method: 'GET',
        url : `http://localhost:8080/user/info/${user.value.id}`,
        mode: "cors",
        headers : {
          Authorization : accessToken,
        }
      });
      console.log(result);
    } catch (error){
      console.log(error);
    }
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
