import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  let { id } = useParams();
  console.log("COW", id);

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [gameText, setGameText] = useState("white");
  const [game, setGame] = useState(false);

  const handleGameText = (event) => {
    setGameText(gameText === "black" ? "#000000" : "#ffffff");
  };

  const call = "https://adventure-tyme.herokuapp.com/characters/";

  const fetchData = async () => {
    const results = await fetch(call + id);
    results.json().then((data) => {
      setCharacters(data);
    });
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const textElement = document.getElementById("text");
  const optionButtonsElement = document.getElementById("option-buttons");

  let state = {};

  //starts the game, default state is an empty obj and we start at the first node
  //the empty obj is where we keep track of what the player has on them.
  //perhaps begin with somthin in their inventory?
  function startGame() {
    setGame(true);
    state = {};
    if (textNodes === null) {
      return <h1>Loading...</h1>;
    } else {
      return showTextNode(1);
    }
  }

  //takes which ever option we select
  function selectOption(option) {
    const nextTextNodeId = option.nextText;

    if (nextTextNodeId <= 0) {
      return startGame();
    }
    //^setting up the game restart

    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
  }

  //this will take the index of the seleced text node
  function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(
      (textNode) => textNode.id === textNodeIndex
    );
    //^ this will display the textnode we are on: comparing the textnode id to the array index of textNodes

    textElement.innerText = textNode.text;
    textElement.style.color = "black";
    //^this is supposed to be grabbing the text element and displaying the nodes text

    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild);
      //^this removes our default option buttons that say 'options #'
    }

    textNode.options.forEach((option) => {
      if (showOption(option)) {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("btnPrim");
        button.addEventListener("click", () => selectOption(option));
        optionButtonsElement.appendChild(button);
      }
    });
  }

  function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
  }

  //these are the text nodes
  const textNodes = [
    {
      id: 1,
      text: "You wake up in a strange place and you see a jar of blue goo near you.",
      options: [
        {
          text: "Take the goo",
          setState: { blueGoo: true },
          nextText: 2,
        },
        {
          text: "Leave the goo",
          nextText: 2,
        },
      ],
    },
    {
      id: 2,
      text: "You venture forth in search of answers to where you are when you come across a merchant.",
      options: [
        {
          text: "Trade the goo for a sword",
          requiredState: (currentState) => currentState.blueGoo,
          setState: { blueGoo: false, sword: true },
          nextText: 3,
        },
        {
          text: "Trade the goo for a shield",
          requiredState: (currentState) => currentState.blueGoo,
          setState: { blueGoo: false, shield: true },
          nextText: 3,
        },
        {
          text: "Ignore the merchant",
          nextText: 3,
        },
      ],
    },
    {
      id: 3,
      text: "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
      options: [
        {
          text: "Explore the castle",
          nextText: 4,
        },
        {
          text: "Find a room to sleep at in the town",
          nextText: 5,
        },
        {
          text: "Find some hay in a stable to sleep in",
          nextText: 6,
        },
      ],
    },
    {
      id: 4,
      text: "You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.",
      options: [
        {
          text: "Restart",
          nextText: -1,
        },
      ],
    },
    {
      id: 5,
      text: "Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
      options: [
        {
          text: "Restart",
          nextText: -1,
        },
      ],
    },
    {
      id: 6,
      text: "You wake up well rested and full of energy ready to explore the nearby castle.",
      options: [
        {
          text: "Explore the castle",
          nextText: 7,
        },
      ],
    },
    {
      id: 7,
      text: "While exploring the castle you come across a horrible monster in your path.",
      options: [
        {
          text: "Try to run",
          nextText: 8,
        },
        {
          text: "Attack it with your sword",
          requiredState: (currentState) => currentState.sword,
          nextText: 9,
        },
        {
          text: "Hide behind your shield",
          requiredState: (currentState) => currentState.shield,
          nextText: 10,
        },
        {
          text: "Throw the blue goo at it",
          requiredState: (currentState) => currentState.blueGoo,
          nextText: 11,
        },
      ],
    },
    {
      id: 8,
      text: "Your attempts to run are in vain and the monster easily catches.",
      options: [
        {
          text: "Restart",
          nextText: -1,
        },
      ],
    },
    {
      id: 9,
      text: "You foolishly thought this monster could be slain with a single sword.",
      options: [
        {
          text: "Restart",
          nextText: -1,
        },
      ],
    },
    {
      id: 10,
      text: "The monster laughed as you hid behind your shield and ate you.",
      options: [
        {
          text: "Restart",
          nextText: -1,
        },
      ],
    },
    {
      id: 11,
      text: "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
      options: [
        {
          text: "Congratulations. Play Again.",
          nextText: -1,
        },
      ],
    },
  ];

  if (loading) return <h1>Loading...</h1>;

  return (
    <section>
      <div>
        <h1>Adventure Tyme</h1>
        <div>
          <img
            src={characters.picture}
            className="card-img-top"
            alt="character"
            style={{ width: 298, height: 298 }}
          />
          <div className="game-bg">
            <h5 className="card-title">{characters.name}</h5>
            <p className="card-text">{characters.role}</p>
            <p className="card-text">
              This character enjoys {characters.powerup}, but hates{" "}
              {characters.weakness}.
            </p>
          </div>
          {show && (
            <button onClick={startGame} onMouseUp={handleGameText} className="btn btn-warning">
              {game === true ? setShow(!show) : "Start Game"}
            </button>
          )}
          <div className="game-bg">
            <h3 id="text" style={{ color: gameText }}>
              Text
            </h3>
            <div id="option-buttons" className="btn-grid">
              <button className="btn" style={{ color: gameText }}>
                Option 1
              </button>
              <button className="btn" style={{ color: gameText }}>
                Option 2
              </button>
              <button className="btn" style={{ color: gameText }}>
                Option 3
              </button>
              <button className="btn" style={{ color: gameText }}>
                Option 4
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Game;
