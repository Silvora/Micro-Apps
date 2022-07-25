import { createContext, useContext } from "react"
import User from "./modules/User"


class RootStore {
    User = User
}

const soter = new RootStore()

const Context = createContext(soter)

export default function Store() {
    return useContext(Context)
}
