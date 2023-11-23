import axios from 'axios';

const root = "http://localhost:8080"
const attempts = 2;

const connect = async ({ method, url, data, headers }) => {
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
          data,
        });
        resolve(result); // 성공시 결과 resolve
        return;
      } catch (error) {
        console.log(error);
        if (error.request !== undefined && error.request.status === 401) { // accessToken 만료
          // console.log("액세스 토큰 만료");
          const refreshResult = await refreshToken();
          if (refreshResult) { // 토큰 갱신 성공
            // console.log("액세스 토큰 갱신 성공")
            continue; // 다시 시도
          } else { // 토큰 갱신 실패
            // console.log("액세스 토큰 갱신 실패! 재갱신 필요함")
            alert("로그인이 만료되었습니다. 로그인 창으로 이동합니다.")

            const refreshFailedError = new Error("refreshToken이 만료됨.");
            refreshFailedError.code = "REFRESH_TOKEN_EXPIRED";
            reject(refreshFailedError);

            location.href = "http://" + window.location.host + "/user/login";
            return;
          }
        }
        // console.log("토큰이 아닌 다른 오류가 발생함");
        reject(error);
        return;
      }
    }

    const somethingWentWrong = new Error("Token 갱신을 여러번 실패");
    somethingWentWrong.code = "SOMETHING_WENT_WRONG";
    reject(somethingWentWrong);
  });
}

const refreshToken = async () => {
  try {
    // console.log("토큰 갱신하러 옴");
    const result = await axios({
      url: root + "/user/refresh?userId=" + localStorage.getItem("userId"),
      method: "POST",
      headers: {
        refreshToken: localStorage.getItem("refresh-token")
      },
    })
    localStorage.setItem("access-token", result.data["access-token"]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { connect }
