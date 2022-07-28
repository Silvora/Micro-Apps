import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import Store from "./store";
import { getToken } from "./utils/Token";
function App() {

  const { User } = Store()
  useEffect(() => {
    const name = getToken("name")
    if(name === null){
      
    }else {
      User.getActive(name)
    }

  })


  return (
    <div className="App">
      <Header></Header>
      <Banner></Banner>
      <Container></Container>
      <Footer></Footer>

    </div>
  );
}

export default App;
