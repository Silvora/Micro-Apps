
export function Event(map) {

    let  $e = null
    map.on('click', function(ev) {

        console.log(ev)  
    // return ev

    $e = ev
      //map.$ev = ev
     //return map
        //console.log(this,ev)
        // this.MapEvent = ev
        //console.log(window)
       // React.$MapEvent = ev
        //return ev
        // // 触发事件的对象
        // var target = ev.target;
        // // 触发事件的地理坐标，AMap.LngLat 类型
        // var lnglat = ev.lnglat;
        // // 触发事件的像素坐标，AMap.Pixel 类型
        // var pixel = ev.pixel;
        // // 触发事件类型
        // var type = ev.type;
      });

      return $e

}