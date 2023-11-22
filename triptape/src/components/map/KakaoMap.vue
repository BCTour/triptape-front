<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
var map;
const positions = ref([]);
const markers = ref([]);
var overlay = null;
const props = defineProps({
  attractions: Array,
});

// watch(
//   () => props.selectStation.value,
//   () => {
//     // 이동할 위도 경도 위치를 생성합니다

//     // 지도 중심을 부드럽게 이동시킵니다
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     var moveLatLon = new kakao.maps.LatLng(props.selectStation.lat, props.selectStation.lng);
//     map.panTo(moveLatLon);
//   },
//   { deep: true }
// );

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    if (overlay) overlay.setMap(null);
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
      }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

// watch(
//   () => props.attractions.value,
//   () => {
//     positions.value = [];
//     props.attractions.forEach((attraction) => {
//       let obj = {};
//       obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
//       obj.title = attraction.name;

//       positions.value.push(obj);
//     });
//     loadMarkers();
//   },
//   { deep: true }
// );

const makeInfo = (markerInfo) => {

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("marker-info");

  const markerHeader = document.createElement("div");
  markerHeader.classList.add("marker-header");
  const markerH3 = document.createElement("h3");
  markerHeader.innerHTML = markerInfo.title;

  const markerBody = document.createElement("div");

  const onClickDetail = async (attractionKey) => {
    await router.push({ name: 'attractionDetail', params: { id: attractionKey } })
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "자세히";
  btn.classList.add("primary-btn");
  btn.classList.add("marker-btn")
  btn.addEventListener("click", () => onClickDetail(markerInfo.attractionKey));

  card.appendChild(markerHeader);
  card.appendChild(markerBody);
  markerBody.appendChild(btn);

  return card;
}

watch(() => props.attractions, () => {
  console.log(props.attractions);
  positions.value = [];
  try {
    props.attractions.forEach((attraction) => {
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
      obj.title = attraction.name;
      obj.key = attraction.attractionKey;
      positions.value.push(obj);
    });
    loadMarkers();
  } catch (error) {

  }
}, { deep: true });

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  loadMarkers();
};

const panTo = (latitude, longitude) => {
  var moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLon);
}


const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();


  positions.value = [];
  if (!props.attractions) return;
  props.attractions.forEach((attraction) => {
    let obj = {};;
    obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    obj.title = attraction.name;
    obj.attractionKey = attraction.attractionKey;
    if (attraction.attractionType != null) obj.type = attraction.attractionType.typeCode;
    positions.value.push(obj);
  });

  // 마커를 생성합니다
  markers.value = [];





  positions.value.forEach((position) => {
    // 마커 이미지를 생성합니다

    let imgSrc = "/src/assets/marker/trip.png";

    if (position.type == 2) imgSrc = "/src/assets/marker/museum.png";
    else if (position.type == 3) imgSrc = "/src/assets/marker/load.png";
    else if (position.type == 4) imgSrc = "/src/assets/marker/sports.png";
    else if (position.type == 5) imgSrc = "/src/assets/marker/bed.png";
    else if (position.type == 6) imgSrc = "/src/assets/marker/shop.png";
    else if (position.type == 7) imgSrc = "/src/assets/marker/food.png";

    // 마커 이미지의 이미지 크기 입니다
    const imgSize = new kakao.maps.Size(40, 35);
    const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
      attractionKey: position.attractionKey
    });

    kakao.maps.event.addListener(marker, 'click', () => {

      if (overlay) overlay.setMap(null);

      var moveLatLon = new kakao.maps.LatLng(position.latlng.Ma, position.latlng.La);
      map.panTo(moveLatLon);


      overlay = new kakao.maps.CustomOverlay({
        content: makeInfo(position),
        map: map,
        position: marker.getPosition(),
        xAnchor: 0.5,
        yAnchor: 1.5
      });

      overlay.setMap(map);
    });
    markers.value.push(marker);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  if (positions.value.length > 0) {
    const bounds = positions.value.reduce(
      (bounds, position) => bounds.extend(position.latlng),
      new kakao.maps.LatLngBounds()
    );
    map.setBounds(bounds);
  }
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};


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

.marker-info {
  width: 150px;
  text-align: center;
}

.marker-header {
  white-space: normal;
  padding: 5px;
  font-weight: 600;
  margin: 5px;
}

.marker-btn {
  width: 100%;
  height: 30px;
  padding: 3px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
