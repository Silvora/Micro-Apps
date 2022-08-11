import AMapLoader from "@amap/amap-jsapi-loader";

async function initMap(){

    const AMap =  await MapLoad()
    const map = await MapContainer(AMap)
    
   // console.log(AMap,map)
    return {AMap:AMap,map:map}

    
}


function MapLoad(){
    return AMapLoader.load({
        key: "f0305f4fddb6c8ca51784fccded49df7", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
  }


  function MapContainer(AMap){
    let map = new AMap.Map("Map", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
        terrain: true, // 开启地形图
        zoom: 15, //初始化地图级别
        center: [114.048987, 22.539712], //初始化地图中心点位置
    });

    return new Promise((resolve, reject)=>{
        resolve(map)
    })
    
  }
export default initMap
