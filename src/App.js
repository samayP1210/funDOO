import NavBar from "./NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import AOPD from './AOPD.jsx';
import Recipies from "./Recipies.jsx";
import ISS from "./ISS.jsx";
import Translation from "./Translation.jsx";
import NotFound from "./NotFound.jsx";
import RecipiesSearch from './RecipiesSearch.jsx';
import RecipyDetail from './RecipyDetail.jsx';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/aopd" element={<AOPD />} />
          <Route path="/iss" element={<ISS />} />
          <Route path="/recipies" element={<Recipies />} />
          <Route path="/recipies/:query" element={<RecipiesSearch />} />
          <Route path="/recipies/view/:name" element={<RecipyDetail />} />
          <Route path="/trans" element={<Translation />} />
          <Route path="*" element={<NotFound msg = {'404 Page Not Found'}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
