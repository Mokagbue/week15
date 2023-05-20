import './App.css';
import Nav from "./components/layout/nav"
import Footer from "./components/layout/footer"
import CharacterList from './components/funcs/characterList';


function App() {






  return (
    <div className="App">
      <Nav />
      <div className="container-fluid">
        <CharacterList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
