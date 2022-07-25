package tool

import "log"

func Init(){
	log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
}
