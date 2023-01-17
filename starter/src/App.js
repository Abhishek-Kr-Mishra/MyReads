import "./App.css";
//import { useState } from "react";
import MainDisplayPage from "./components/BookShelves/MainDisplayPage";
import SearchPage from "./components/Search/SearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
  //const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      
        
          <Routes>
            <Route exact path="/" element={ <MainDisplayPage></MainDisplayPage> } />
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
          </Routes>
        </div>
  );
}

export default App;
