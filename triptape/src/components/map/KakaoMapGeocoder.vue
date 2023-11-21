<script setup>
import { ref, watch, onMounted } from "vue";

var map;
var geocoder;
var marker; // 클릭한 위치를 표시
var infowindow;

const emit = defineEmits(["onClickPoint"])

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  geocoder = new kakao.maps.services.Geocoder();
  marker = new kakao.maps.Marker();
  infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

  kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
      // console.log(kakao)
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result[0].address)
        emit("onClickPoint", { latitude: mouseEvent.latLng.Ma, longitude: mouseEvent.latLng.La, address: result[0].address.address_name });
        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);
      }
    })
  });
};
const searchDetailAddrFromCoords = (coords, callback) => {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  flex: 1;
}
</style>
