import { useState, useEffect } from "react";

function EditCharacter() {
  const [newChar, setNewChar] = useState({
    name: "",
    class: "",
    weapon: "",
    powerup: "",
    weaknes: "",
    picture: "",
  });
  const [loading, setLoading] = useState(true);
 const[charId, setCharId] = useState(null)

  const call = "https://adventure-tyme.herokuapp.com/characters";

  const fetchData = async () => {
    const results = await fetch(call + charId);
    results
      .json()
      .then((data) => {

        console.log("DATA in EDIT", data);
      })
      .catch((error) => {
        console.log("ERROR in EDIT FETCH", error.message);
      });
  };

  // const fetchData = async () => {
  //   const results = await fetch(call);
  //   results.json().then((data) => {
  //     setCharacters(data);

  //     console.log("COW", data);
  //   });
  // };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="d-flex flex-row justify-content-center mx-auto">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            placeholder="name"
            name="name"
            value={newChar.name}
            onChange={handleInput}
          />
          <label>Class</label>
          <input
            placeholder="class"
            name="class"
            value={newChar.class}
            onChange={handleInput}
          />
          <label>Weapon</label>
          <input
            placeholder="weapon"
            name="weapon"
            value={newChar.weapon}
            onChange={handleInput}
          />
          <label>Power Up</label>
          <input
            placeholder="powerup"
            name="powerup"
            value={newChar.powerup}
            onChange={handleInput}
          />
          <label>Weakness</label>
          <input
            placeholder="weakness"
            name="weakness"
            value={newChar.weakness}
            onChange={handleInput}
          />
          <label>Picture URl</label>
          <input
            placeholder="picture"
            name="picture"
            value={newChar.picture}
            onChange={handleInput}
          />
          <button onSubmit={handleSubmit}>Add New Character</button>
        </form>
      </div>
    </>
  );
}

export default EditCharacter;
