import axios from 'axios';

const root = "http://localhost:8080"
const attempts = 2;


const connect = async ({ method, url, body, headers }) => {
  return new Promise(async (resolve, reject) => {
    for (var i = 0; i < attempts; i++) {
      try {
        const result = await axios({
          method: method,
          url: root + url,
          headers: {
            Authorization: localStorage.getItem("access-token"),
            ...headers
          },
          data: {
            ...body
          },
        });
        resolve(result); // 성공시 결과 resolve
      } catch (error) {
        console.log(error);
        if (error.request.status === 401) { // accessToken 만료
          console.log("액세스 토큰 만료");
          const refreshResult = await refreshToken();
          if (refreshResult) { // 토큰 갱신 성공
            console.log("액세스 토큰 갱신 성공")
            continue; // 다시 시도
          } else { // 토큰 갱신 실패
            console.log("액세스 토큰 갱신 실패! 재갱신 필요함")
            const refreshFailedError = new Error("Refreshing Token Failed.");
            refreshFailedError.code = "REFRESH_FAILED";
            reject(refreshFailedError);
          }
        }
        console.log("토큰이 아닌 다른 오류가 발생함");
        reject(error);
      }
    }

    console.log("무언가 단단히 잘못됨!!!!!!!!!!!");
    const somethingWentWrong = new Error("Token 갱신을 여러번 실패");
    somethingWentWrong.code = "SOMETHING_WENT_WRONG";
    reject(somethingWentWrong);
  });
} 

const refreshToken = async () => {
  try {
    console.log("토큰 갱신하러 옴");
    const result = await axios({
      url: root + "/user/refresh/" + localStorage.getItem("userId"),
      method: "POST",
      headers: {
        refreshToken: localStorage.getItem("refresh-token")
      },
    })
    localStorage.setItem("access-token", result.data["access-Token"]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { connect }
