import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     loginId: null,
//     isLogined: false,
//     token: null
//   }),

//   actions: {
//     login(id, pw) {
//       const testId = "ssafy";
//       const testPw = "ssafy";
//       const testToken = "aaaa";
//       // TO-DO : axios.post로 로그인 수행
//       if (id === testId && pw === testPw){
//         this.loginId = id;
//         this.isLogined = true;
//         this.token = testToken;
//         return true;
//       } else {
//         return false;
//       }
//     },

//     logout() {
//       this.loginId = null;
//       this.isLogined = false;
//       this.token = null;
//     }
//   }
// })

export const useAuthStore = defineStore('auth', () => {
  const isLogined = ref(false);
  const user = ref({
    id : null,
    token: null,
    name: null,
  });

  function login(id, pw) {
    const testId = "ssafy";
    const testPw = "ssafy";
    const testToken = "aaaa";
    /**
     * TO-DO : axios.post로 로그인 수행
     * 지금은 test용으로 ssafy만 입력하면 로그인 성공하게 해두었음
     */
    if (id === testId && pw === testPw){
      user.value.id = id;
      user.value.token = testToken;
      user.value.name = "김싸피";

      isLogined.value = true;
      return true;
    } else {
      return false;
    }
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
