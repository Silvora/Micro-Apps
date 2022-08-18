import "./App.scss"
import { Layout, Modal } from 'antd';
import { useDispatch ,useSelector} from "react-redux"
import TextInput from "./components/TextInput";
import UserMenu from "./components/UserMenu";
import UserMessges from "./components/UserMessges";
import img2 from "./assets/2.jpeg"
import { useEffect,useState } from "react";
import Login from "./components/Login";
import {GetToken,SetToken} from "./utils/token"
import Http from "./api/http"
import {SetMyinfo} from "./store/modules/MyToYouInfo"
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const dispacth = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);





  
  const { ToName } = useSelector(state => state.MyToYouInfo)

  useEffect(()=>{
    let name = GetToken("name")
    let token = GetToken("token")

    if(name === null || token === null){
      setIsModalVisible(true)
    }else{
      let data = new FormData()
      data.append("user", name)
      Http.Post("/root/active",data).then(res=>{
       // console.log(res)
       if(res.code === 200){
        SetToken("name", res.name)
        SetToken("id", res.id)
        dispacth(SetMyinfo(res))
       }
      })
      
    }
  },[])
  
  const SetModalVisible =()=>{
    setIsModalVisible(false)
  }

  return (
    <div className="App">
      <Layout>
      <Layout>
        <Header>{ToName}</Header>
        <Content>
          {
            ToName?<UserMessges/>:<img className="imgContent" src={img2} alt="图片加载失败。。。"></img>
            
          }
        </Content>
        <Footer><TextInput/></Footer>
      </Layout>
      <Sider><UserMenu/></Sider>
    </Layout>

    <Modal title="登录/注册"  visible={isModalVisible} footer={[]}>
          <Login SetModalVisible={SetModalVisible}></Login>
      </Modal>
    </div>
  );
}

export default App;
