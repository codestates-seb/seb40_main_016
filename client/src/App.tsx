import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./utills/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Mypage from "./pages/MyPage/MyPage";
import Profiles from "./pages/Profiles/Profiles";
import NotFound from "./pages/NotFound/NotFound";
import NewArticle from "./pages/Articles/NewArticle";
import Detail from "./pages/Detail/Detail";
import Shop from "./pages/Shop/Shop";

function App() {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDetailOn, setIsDetailOn] = useState<boolean>(false);
  const [articleId, setArticleId] = useState<number>(null);

  const createPopupHandler = () => {
    setIsEdit(false);
    setIsOn(!isOn);
  };

  const editPopupHandler = () => {
    setIsEdit(true);
    setIsOn(!isOn);
  };

  const detailHandler = () => {
    setIsDetailOn(!isDetailOn);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header popupHandler={createPopupHandler} />
        <Routes>
          <Route index path="/" element={<Main detailHandler={detailHandler} setArticleId={setArticleId} />} />
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/mypage" element={<Mypage />} />
          <Route
            index
            path="/profiles/:id"
            element={<Profiles detailHandler={detailHandler} setArticleId={setArticleId} />}
          />
          <Route index path="/shop" element={<Shop />} />
          <Route index path="*" element={<NotFound />} />
        </Routes>
        <NewArticle isOn={isOn} setIsOn={setIsOn} isEdit={isEdit} articleId={articleId} />
        <Detail
          articleId={articleId}
          isDetailOn={isDetailOn}
          detailHandler={detailHandler}
          editPopupHandler={editPopupHandler}
        />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
