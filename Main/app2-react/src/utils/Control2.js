const ControlData = {
    ToolBar: {position:'LT',offset: [30, 50] },
    Scale: {position:'LT',offset: [10, 10] },
    HawkEye: {isOpen:true},
    MapType: {},
    Geolocation: {position:'RT',offset:[10,300] },
    ControlBar: {position:'LB',offset:[10,10],showControlButton: true }
}


export function addControl(AMap,map,data= ControlData){
    AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.HawkEye',
        'AMap.MapType',
        'AMap.Geolocation',
        'AMap.ControlBar',
    ], function(){
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar(data.ToolBar));
    
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale(data.Scale));
    
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(new AMap.HawkEye(data.HawkEye));
       
        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        map.addControl(new AMap.MapType(data.MapType));
       
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation(data.Geolocation));
  
        // 组合了旋转、倾斜、复位在内的地图控件。
        map.addControl(new AMap.ControlBar(data.ControlBar));
    });
}