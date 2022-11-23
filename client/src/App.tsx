import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utills/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Mypage from "./pages/MyPage/MyPage";
import NotFound from "./pages/NotFound/NotFound";
import NewArticle from "./pages/Articles/NewArticle";
import { useState } from "react";

function App() {
  const [isOn, setIsOn] = useState<boolean>(false);

  const popupHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header popupHandler={popupHandler} />
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/mypage" element={<Mypage />} />
          <Route index path="*" element={<NotFound />} />
        </Routes>
        <NewArticle isOn={isOn} setIsOn={setIsOn} />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
