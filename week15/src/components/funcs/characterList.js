import { useState, useEffect } from "react";
// import defaultImage from "../../assests/images/defaultchar.png"

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [newChar, setNewChar] = useState({
    name: "",
    class: "",
    weapon: "",
    powerup:"",
    weaknes: "",
    picture: ""
  })
  const [idGrab, setIdGrab] = useState(0)
  const [loading, setLoading] = useState(true);

  const call = "https://adventure-tyme.herokuapp.com/characters";

  const fetchData = async () => {
    const results = await fetch(call);
    results.json().then((data) => {
      setCharacters(data);

      console.log("COW", data);
    });
  };

  const handleInput = (event) =>{
    const {name, value} = event.target;
    setNewChar((characters)=>({
      ...characters,[name]: value
    }))
  }

  // const handleCharEdit = async(charId) =>{
  //   setIdGrab(charId)
  //   console.log("edit IT?", idGrab)
  // }

  const handleCharDelete = async(charId) =>{
  setIdGrab(charId)
    console.log("delete IT?", idGrab)

    await fetch(`${call}/${idGrab}`, {
      method: "Delete",
    }).then((response)=> {
      if (response.status !== 200) {
        return
      } else {
        setCharacters(characters.filter((charcters) => {
          return charcters.id !== idGrab;
        }))
      }
    }).catch((error)=> {
      console.log("DELETION ERROR: ", error.message)
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("HANDLING IT?", newChar)
    
    fetch(call, {
      method:"POST",
      headers:{"content-type": "application/json"},
      body:JSON.stringify(newChar)
    }).then(()=>{
      console.log("NEW CHARACTER ADDED")
      window.location.reload();
    }).catch((error)=>{
      console.log("ERROR, NEW CHAR NOT ADDED", error)
    })
  };


  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="d-flex flex-row justify-content-center mx-auto">
        {characters.map((characters) => (
          <div key={characters.id}>
            <div className="card" style={{ width: "300px" }}>
              <img
                src={characters.picture}
                className="card-img-top"
                alt="character"
                style={{width:298, height:298}}
              />
              <div className="card-body">
                <h5 className="card-title">{characters.name}</h5>
                <p className="card-text">{characters.class}</p>
                <p className="card-text">
                  This character enjoys {characters.powerup}, but hates {characters.weakness}.</p>
                {/* <button href="#" className="btn btn-warning" onClick={() => handleCharEdit(characters.id)}>Edit Character
                </button> */}
                {console.log("Am I?", characters.id)}
                <button  className="btn btn-danger" onClick={(event) => handleCharDelete(characters.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-row mx-auto border justify-content-center">
      <div className="m-2 border" >
        <h3>Add Charater</h3>
        <form onSubmit={handleSubmit}  className="d-flex flex-column mx-auto w-70 m-2 border">
          <label>Name</label>
          <input placeholder="name" name="name" value={newChar.name} onChange={handleInput}/>
          <label>Class</label>
          <input placeholder="class" name="class" value={newChar.class} onChange={handleInput}/>
          <label>Weapon</label>
          <input placeholder="weapon" name="weapon" value={newChar.weapon} onChange={handleInput}/>
          <label>Power Up</label>
          <input placeholder="powerup" name="powerup" value={newChar.powerup} onChange={handleInput}/>
          <label>Weakness</label>
          <input placeholder="weakness" name="weakness" value={newChar.weakness} onChange={handleInput} />
          <label>Picture URL</label>
          <input placeholder="picture" name="picture" value={newChar.picture} onChange={handleInput}/>
          <button onSubmit={handleSubmit}>Add New Character</button>
        </form>
      </div>
      </div>
      
    </>
  );
}

export default CharacterList;
