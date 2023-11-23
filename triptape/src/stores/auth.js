import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from "@/util/http-commons.js";
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
  const isLogined = ref(false);

  const user = ref({
    id: null,
    name: null,
    role: null,
  });

  const router = useRouter();
  const login = async (id, pw) => {
    /**
     * TO-DO : axios.post로 로그인 수행
     * 지금은 test용으로 ssafy만 입력하면 로그인 성공하게 해두었음
     */
    // console.log(id + " " + pw);
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
      // console.log(user.value);
      isLogined.value = true;
      user.value.id = id;

      localStorage.setItem("userId", id);
      localStorage.setItem("access-token", result.data["access-token"]);
      localStorage.setItem("refresh-token", result.data["refresh-token"]);

      const userInfo = await getUserInfo();
      user.value.name = userInfo.data.userInfo.userName;
      user.value.role = userInfo.data.userInfo.isAdmin;
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
    user.value.role = null;

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("userId");

    isLogined.value = false;

    router.push({ name: 'main' });
  }

  const getUserInfo = async () => {
    try {
      const result = await http({
        method: 'GET',
        url: `/user/info/${user.value.id}`,
        headers: {
          Authorization: localStorage.getItem("access-token")
        }
      })

      return result;
    } catch (error) {
      if (error.code === "REFRESH_TOKEN_EXPIRED") {

      }
    }
  }

  const getLikedTapes = async () => {

  }

  return {
    isLogined, user,
    login, logout,
  }
}, {
  persist: {
    enabled: true,
    strategies: [{ strage: localStorage }],
  }
})