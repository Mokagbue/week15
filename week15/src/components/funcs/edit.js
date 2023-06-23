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
  const [strength, setStrength] = useState();
  const [defense, setDefense] = useState();
  const [charm, setCharm] = useState();
  const [rolledStat, setRolledStat] = useState([]);
  const navigate = useNavigate();

  let { id } = useParams();
  console.log("Edit OW", id);

  const call = "https://adventure-tyme.onrender.com/characters/";

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
      setCharm(data.rolledStat[2]);
      setStrength(data.rolledStat[0]);
      setDefense(data.rolledStat[1]);
    });
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
    console.log("GOAT", character);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const edited = { name, role, weapon, powerup, weakness, picture, strength, defense, charm };
    fetch(call + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(edited),
    })
      .then(() => {
        console.log("Character Edited");
        navigate(-1);
      })
      .catch((error) => {
        console.log("ERROR, NEW CHAR NOT ADDED", error);
      });
  };
  
  const handleRollingStat = (event) => {
    event.preventDefault();
    let strength = Math.floor(Math.random()*(20 - 1) + 1);
    let defense = Math.floor(Math.random()*(20 - 1) + 1);
    let charm = Math.floor(Math.random()*(20 - 1) + 1);
    setRolledStat([strength, defense, charm]);
  };

  return (
    <div className="col-sm-6 mx-auto">
      <h1>Edit Character</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column mx-auto w-70 m-2 border"
      >
        <label className="d-flex flex-start mx-2">Name</label>
        <input
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="d-flex flex-start mx-2">Class</label>
        <input
          placeholder="class"
          name="class"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <label className="d-flex flex-start mx-2">Weapon</label>
        <input
          placeholder="weapon"
          name="weapon"
          value={weapon}
          onChange={(e) => setWeapon(e.target.value)}
        />
        <label className="d-flex flex-start mx-2">Power Up</label>
        <input
          placeholder="powerup"
          name="powerup"
          value={powerup}
          onChange={(e) => setPowerup(e.target.value)}
        />
        <label className="d-flex flex-start mx-2">Weakness</label>
        <input
          placeholder="weakness"
          name="weakness"
          value={weakness}
          onChange={(e) => setWeakness(e.target.value)}
        />
        <label className="d-flex flex-start mx-2">Picture URL</label>
        <input
          placeholder="picture"
          name="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <div>
          <p>Roll Stats</p>
          <button onClick={handleRollingStat}> Roll</button>
          <div>
            <label className="d-flex flex-start mx-2">Strength</label>
            <p className="p-text">{rolledStat[0]}</p>
          </div>
          <div>
            <label className="d-flex flex-start mx-2">Defense</label>
            <p className="p-text">{rolledStat[1]}</p>
          </div>
          <div>
            <label className="d-flex flex-start mx-2">Charm</label>
            <p className="p-text">{rolledStat[2]}</p>
          </div>
        </div>

        <button
          onSubmit={handleSubmit}
          className="btn btn-primary m-2"
          style={{ width: "150px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default EditChar;
