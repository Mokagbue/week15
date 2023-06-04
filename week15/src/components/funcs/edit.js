import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditChar() {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [weapon, setWeapon] = useState("");
  const [powerup, setPowerup] = useState("");
  const [weakness, setWeakness] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();
  console.log("Edit OW", id);

  const call = "https://adventure-tyme.herokuapp.com/characters/";

  const fetchData = async () => {
    const results = await fetch(call + id);
    results.json().then((data) => {
      setCharacter(data);
      console.log("CHIKEN", data);
      setName(data.name);
      setRole(data.role);
      setWeapon(data.weapon);
      setPowerup(data.powerup);
      setWeakness(data.weakness);
      setPicture(data.picture);
    });
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
    console.log("GOAT", character);
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const edited = {name, role, weapon, powerup, weakness, picture}
    fetch(call + id, {
      method:"PUT",
      headers:{"content-type": "application/json"},
      body:JSON.stringify(edited)
    }).then(()=>{
      console.log("Character Edited")
      navigate(-1)
    }).catch((error)=>{
      console.log("ERROR, NEW CHAR NOT ADDED", error)
    })
  };


  return (
    <div className="col-sm-6 mx-auto">
      <h3>Edit Character</h3>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column mx-auto w-70 m-2 border"
      >
        <label>Name</label>
        <input
          placeholder="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Class</label>
        <input
          placeholder="class"
          name="class"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
        <label>Weapon</label>
        <input
          placeholder="weapon"
          name="weapon"
          value={weapon}
          onChange={e => setWeapon(e.target.value)}
        />
        <label>Power Up</label>
        <input
          placeholder="powerup"
          name="powerup"
          value={powerup}
          onChange={e => setPowerup(e.target.value)}
        />
        <label>Weakness</label>
        <input
          placeholder="weakness"
          name="weakness"
          value={weakness}
          onChange={e => setWeakness(e.target.value)}
        />
        <label>Picture URL</label>
        <input
          placeholder="picture"
          name="picture"
          value={picture}
          onChange={e => setPicture(e.target.value)}
        />
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
export default EditChar;
