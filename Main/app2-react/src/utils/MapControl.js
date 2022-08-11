import Map from "./Map"


export default class Control extends Map{
    constructor(AMap,map){

        // this.AMap = AMap;
        // this.map = map;
        super(AMap, map)
        //super(AMap, map)
        //super()
    }

    getA(){
        console.log(this,Map)
        console.log(this.AMap)
    }
}


//new Control().getA()