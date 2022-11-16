import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utills/ScrollToTop";
// import HeaderBefore from "./components/HeaderBefore";
import HeaderAfter from "./components/HeaderAfter";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Signup";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <HeaderAfter />
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
