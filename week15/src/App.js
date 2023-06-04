import "./App.css";
import Layout from "./components/layout/Layout";
import CharacterList from "./components/pages/characterList";
import Edit from "./components/funcs/edit.js";
import Game from "../src/components/game/game.js";
import Landing from "../src/components/pages/landing.js";
import Home from "../src/components/pages/home.js";
import About from "../src/components/pages/about.js";
import Missing from "../src/components/pages/missing.js"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="home/game" element={<CharacterList />}/>
        <Route path="home/game/:id" element={<Game />} />
        <Route path="home/game/edit/:id" element={<Edit />} />
        <Route path="home/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
