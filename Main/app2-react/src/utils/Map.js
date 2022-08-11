import AMapLoader from "@amap/amap-jsapi-loader";
import initMap from "./initMap";

export default class Map {
    constructor() {
        this.AMap = null
        this.map = null
    }
    MAPLoad(){
        return AMapLoader.load({
            key: "f0305f4fddb6c8ca51784fccded49df7", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.PolylineEditor","AMap.PolygonEditor","AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
    }
    initMap(AMap){
        let map = new AMap.Map("Map", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
            terrain: true, // 开启地形图
            zoom: 15, //初始化地图级别
            center: [114.048987, 22.539712], //初始化地图中心点位置
        });
        this.map = map
        this.AMap = AMap
        return map
    }

    MapEvent(e) {
        console.log(e)
        this.$e = e;
        //React.$e = e
        //console.log(this.$e, this.AMap)
    }

    addMarker(name) {
        //console.log(this.AMap, this.map, this.$e)
        // 创建一个 Marker 实例：
        let str = "marker"+name
        str = new this.AMap.Marker({
            position: this.$e.lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: name,
        });

        // 将创建的点标记添加到已有的地图实例：
        this.map.add(str);
    }

    addControl(){
       // console.log(this.AMap, this.map)

        let AMap = this.AMap
        let map = this.map
        const ControlData = {
            ToolBar: {position:'LT',offset: [30, 50] },
            Scale: {position:'LT',offset: [10, 10] },
            HawkEye: {isOpen:true},
            MapType: {},
            Geolocation: {position:'RT',offset:[10,300] },
            ControlBar: {position:'LB',offset:[10,10],showControlButton: true }
        }

        AMap.plugin([
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.HawkEye',
            'AMap.MapType',
            'AMap.Geolocation',
            'AMap.ControlBar',
        ], function(){
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar(ControlData.ToolBar));
        
            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.addControl(new AMap.Scale(ControlData.Scale));
        
            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            map.addControl(new AMap.HawkEye(ControlData.HawkEye));
           
            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            map.addControl(new AMap.MapType(ControlData.MapType));
           
            // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            map.addControl(new AMap.Geolocation(ControlData.Geolocation));
      
            // 组合了旋转、倾斜、复位在内的地图控件。
            map.addControl(new AMap.ControlBar(ControlData.ControlBar));
        });
    }
    
    addPolyline(name, path){
       console.log(name, path)
        let str = "polyline"+name
        // 创建折线实例
        str = new this.AMap.Polyline({
            path: path,  
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });
        // 将折线添加至地图实例
        this.map.add(str);
    }

    addPolygon(name, path){
        console.log(name, path)
         let str = "polygon"+name
         // 创建折线实例
         str = new this.AMap.Polygon({
             path: path,  
             borderWeight: 2, // 线条宽度，默认为 1
             strokeColor: 'red', // 线条颜色
             //lineJoin: 'round' // 折线拐点连接处样式
             fillColor: '#fff', 
         });
         // 将折线添加至地图实例
         this.map.add(str);


         var area = this.AMap.GeometryUtil.ringArea([...path]);
         console.log(area)
     }

     addCircle(name){
       // console.log(name, path)
         let str = "circle"+name
         console.log(str, this.$e)
         // 创建折线实例
         str = new this.AMap.Circle({
            center: this.$e.lnglat,  
            radius: 100, // 圆半径
            fillColor: 'red',   // 圆形填充颜色
            strokeColor: '#fff', // 描边颜色
            strokeWeight: 2, // 描边宽度
         });
         // 将折线添加至地图实例
         this.map.add(str);
     }
    
     addRectangle(name){
       // console.log(name, path)
       
       var southWest = new this.AMap.LngLat(this.$e.lnglat.lng, this.$e.lnglat.lat)
       var northEast = new this.AMap.LngLat(this.$e.lnglat.lng + 0.01, this.$e.lnglat.lat+0.01)
        
    
        var bounds = new this.AMap.Bounds(southWest, northEast)

            
         let str = "rectangle"+name

         // 创建折线实例
         str = new this.AMap.Rectangle({
            bounds: bounds,
            strokeColor:'red',
            strokeWeight: 6,
            strokeOpacity:0.5,
            strokeDasharray: [30,10],
            // strokeStyle还支持 solid
            strokeStyle: 'dashed',
            fillColor:'blue',
            fillOpacity:0.5,
            cursor:'pointer',
            zIndex:50,
         });
         // 将折线添加至地图实例
         this.map.add(str);


     }

     addEllipse(name){
        //console.log(name)
         let str = "ellipse"+name
         // 创建折线实例
         str = new this.AMap.Ellipse({
            center: this.$e.lnglat,
            radius: [ 200, 100 ], //半径
            borderWeight: 3,
            strokeColor: "#FF33FF", 
            strokeOpacity: 1,
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            // 线样式还支持 'dashed'
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10], 
            fillColor: '#1791fc',
            zIndex: 50,
         });
         // 将折线添加至地图实例
         this.map.add(str);
     }


     addMarkerTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            var mouseTool = new AMap.MouseTool(map); 
        
            //使用鼠标工具，在地图上画标记点
            mouseTool.marker(); 
        });
     }

     addRectangleTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            var mouseTool = new AMap.MouseTool(map); 
        
            //使用鼠标工具，在地图上画标记点
            mouseTool.rectangle(); 
        });
     }

     addCircleTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            var mouseTool = new AMap.MouseTool(map); 
        
            //使用鼠标工具，在地图上画标记点
            mouseTool.circle(); 
        });
     }
     addEllipseTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            var mouseTool = new AMap.MouseTool(map); 
        
            //使用鼠标工具，在地图上画标记点
            mouseTool.ellipse(); 
        });
     }

     addPolylineTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            //在地图中添加MouseTool插件
             var mouseTool = new AMap.MouseTool(map);
         
             //用鼠标工具画多边形
            mouseTool.polyline(); 
         
            //  //添加事件
            //  AMap.event.addListener( mouseTool,'draw',function(e){
            //      console.log(e.obj.getPath());//获取路径/范围
            //  });
         });
     }

     addPolygonTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.MouseTool"],function(){ 
            //在地图中添加MouseTool插件
             var mouseTool = new AMap.MouseTool(map);
         
             //用鼠标工具画多边形
            mouseTool.polygon(); 
         
            //  //添加事件
            //  AMap.event.addListener( mouseTool,'draw',function(e){
            //      console.log(e.obj.getPath());//获取路径/范围
            //  });
         });
     }

     addDistanceTool(){
        let AMap = this.AMap
        let map = this.map
        
        map.plugin(["AMap.RangingTool"],function(){ 
            //在地图中添加MouseTool插件
            var distanceTool = new AMap. AMap.RangingTool(map);

            //测量
            distanceTool.turnOn();       
        });
     }


     EditorMap(){
        let AMap = this.AMap
        let map = this.map
        var path = [
            new AMap.LngLat(114.048987, 22.539712),
            new AMap.LngLat(114.048087, 22.530712),
            new AMap.LngLat(114.048907, 22.530912),
            new AMap.LngLat(114.041987, 22.539752)
        ];
        
        var polyline = new AMap.Polyline({
            path: path,  
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });
        
        map.add(polyline);





       
            // 实例化多边形编辑器，传入地图实例和要进行编辑的多边形实例
            var polylineEditor = new AMap.PolylineEditor(map, polyline); 
         
            // 开启编辑模式
            polylineEditor.open(); 
           
     }


     DrivingMap(){
        var driving = new this.AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            map: this.map,
            policy: this.AMap.DrivingPolicy.LEAST_TIME
          })
          
          var startLngLat = new this.AMap.LngLat(114.052898,22.539972)
          var endLngLat = new this.AMap.LngLat(114.029982, 22.534831)

          var START = new this.AMap.Marker({
            position: startLngLat,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: 'START'
        });

        var END = new this.AMap.Marker({
            position: endLngLat,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: 'END'
        });
        this.map.add(START);
        this.map.add(END);
          
          driving.search(startLngLat, endLngLat, function (status, result) {
            // 未出错时，result即是对应的路线规划方案
            if (status === 'complete') {
                console.log('绘制驾车路线完成')
            } else {
                console.log('获取驾车数据失败：' + result)
            }
          })
        //   var route = new this.AMap.DragRoute(this.map, [START,END], this.AMap.DrivingPolicy.LEAST_FEE)
        //   // 查询导航路径并开启拖拽导航
        //   route.search()
     }

}