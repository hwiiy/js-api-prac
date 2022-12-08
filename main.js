const API_KEY = "MHcvXF9dlZGdny3bf3jtzMJL9M2XLq02yQNQ8NDPBtl8%2BZVdzUU6cBS9Ts%2FBDwhop4yhDkDhTmRXYRZ%2Fz%2BqFkA%3D%3D"


// 도로교통공단_자전거 사고 다발 지역 데이터 불러옴

async function getData (){
    const url = new URL(`http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=${API_KEY}&searchYearCd=2020&siDo=27&guGun=260&type=json&numOfRows=10&pageNo=1`)
    const response = await fetch(url)
    const data = await response.json()
 
    const locations = data.items.item.map((spot)=>[
        spot.spot_nm,spot.la_crd,spot.lo_crd
    ]);
   
    drawMap(locations)
};


// 구글맵 api 활용

function drawMap(locations) {
    // 매개변수의 형태
    // locations =[ ["지역이름",위도,경도]],
    //              ["지역이름",위도,경도]
    //            ]
  
    //맵을 생성
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  
    const infowindow = new google.maps.InfoWindow();
  
   // 로케이션별로 마크 생성
    for (let i =0; i < locations.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
      });
  
      // 마크를 클릭했을때 보여주는 정보
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }

getData()