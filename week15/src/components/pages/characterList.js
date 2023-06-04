import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [newChar, setNewChar] = useState({
    name: "",
    role: "",
    weapon: "",
    powerup: "",
    weaknes: "",
    picture: "",
  });
  const [idGrab, setIdGrab] = useState(0);
  const [loading, setLoading] = useState(true);

  const call = "https://adventure-tyme.herokuapp.com/characters";

  const fetchData = async () => {
    const results = await fetch(call);
    results.json().then((data) => {
      setCharacters(data);
    });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewChar((characters) => ({
      ...characters,
      [name]: value,
    }));
  };

  const handleCharDelete = async (charId) => {
    setIdGrab(charId);
    console.log("delete IT?", idGrab);

    await fetch(`${call}/${idGrab}`, {
      method: "Delete",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setCharacters(
            characters.filter((charcters) => {
              return charcters.id !== idGrab;
            })
          );
        }
      })
      .catch((error) => {
        console.log("DELETION ERROR: ", error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("HANDLING IT?", newChar);

    fetch(call, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newChar),
    })
      .then(() => {
        console.log("NEW CHARACTER ADDED");
        window.location.reload();
      })
      .catch((error) => {
        console.log("ERROR, NEW CHAR NOT ADDED", error);
      });
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        <h1>Character Selection</h1>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center mx-auto">
        {characters.map((characters) => (
          <div key={characters.id}>
            <div className="card" style={{ width: "350px", margin: "10px" }}>
              <div className="d-flex justify-content-center mx-auto">
                <img
                  src={characters.picture}
                  className="card-img-top"
                  alt="character"
                  style={{ width: 298, height: 298 }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{characters.name}</h5>
                <p className="card-text">{characters.role}</p>
                <p className="card-text">
                  This character enjoys {characters.powerup}, but hates{" "}
                  {characters.weakness}.
                </p>
                <Link to={`${characters.id}`} className="btn btn-primary">
                  Game Start
                </Link>
                <Link
                  to={`edit/${characters.id}`}
                  className="btn btn-warning mx-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={(event) => handleCharDelete(characters.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
          src="https://i.imgur.com/AWDrJmG.png"
          alt="banner home"
          className="img-fluid my-3"
        />
      <div className="d-flex flex-row mx-auto justify-content-center">
        <div className="m-3">
          <h1>Add A New Charater</h1>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column mx-auto my-2 border"
          >
            <label className="d-flex flex-start mx-2">Name</label>
            <input
              placeholder="name"
              name="name"
              value={newChar.name}
              onChange={handleInput}
            />
            <label className="d-flex flex-start mx-2">Class</label>
            <input
              placeholder="class"
              name="role"
              value={newChar.role}
              onChange={handleInput}
            />
            <label className="d-flex flex-start mx-2">Weapon</label>
            <input
              placeholder="weapon"
              name="weapon"
              value={newChar.weapon}
              onChange={handleInput}
            />
            <label className="d-flex flex-start mx-2">Power Up</label>
            <input
              placeholder="powerup"
              name="powerup"
              value={newChar.powerup}
              onChange={handleInput}
            />
            <label className="d-flex flex-start mx-2">Weakness</label>
            <input
              placeholder="weakness"
              name="weakness"
              value={newChar.weakness}
              onChange={handleInput}
            />
            <label className="d-flex flex-start mx-2">Picture URL</label>
            <input
              placeholder="picture"
              name="picture"
              value={newChar.picture || "https://i.imgur.com/NgLWaqd.png"}
              onChange={handleInput}
            />
            <button
              onSubmit={handleSubmit}
              className="btn btn-primary m-2"
              style={{ width: "150px" }}
            >
              Add New Character
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CharacterList;
