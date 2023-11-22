<script setup>
import { ref, watch, onMounted } from "vue";

var map;
var geocoder;
var marker; // 클릭한 위치를 표시
var infowindow;

const emit = defineEmits(["onClickPoint"])
const props = defineProps({
  address: String,
  latitude: Number,
  longitude: Number,
})


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

watch(()=>props.latitude, ()=>{
  try {
    const pos = new kakao.maps.latLng(props.latitude, props.longitude);
    if (!marker) marker = new kakao.maps.Marker();
    marker.setPosition(pos);
    marker.setMap(map);
  } catch(error){}
})


const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  geocoder = new kakao.maps.services.Geocoder();
  if (!marker) marker = new kakao.maps.Marker();
  infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
  kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
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

const searchingAddress = ref("");

const onClickAddressSearch = () => {
  geocoder.addressSearch(searchingAddress.value, (result, status) => {
    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      if (marker) marker.setMap(null);
      emit("onClickPoint", { latitude: result[0].y, longitude: result[0].x, address: searchingAddress.value});
      // 결과값으로 받은 위치를 마커로 표시합니다
      marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });
      map.setCenter(coords);
    } 
  });    
}

</script>

<template>
  <div class="card row">
    <input type="text" v-model="searchingAddress"/>
    <button class="primary-btn" @click="onClickAddressSearch">주소 검색</button>
  </div>
  <div id="map"> </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.row > input {
  flex: 1;
  margin-right: 8px;
}

.card {
  padding: 16px;
  margin-bottom: 16px;
}

#map {
  width: 100%;
  height: calc(100% - 90px);
  border-radius: 12px;
  flex: 1;
}
</style>
