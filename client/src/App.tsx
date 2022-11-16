import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utills/ScrollToTop";
// import HeaderBefore from "./components/Header/HeaderBefore";
import HeaderAfter from "./components/Header/HeaderAfter";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Signup";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {/* <HeaderBefore /> */}
        <HeaderAfter />
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
