import Contact from "./contact.js";

function About() {
  return (
    <div>
      <h1> About Page </h1>
      <div>
        <p className="p-text">Adventure Tyme is a Text Based Fantasy Game.</p>
        <p className="p-text">Created using React and JSON-server</p>
      </div>
      <div className="d-flex justify-content-center mx-auto flex-column">
        <div className="d-flex flex-row border justify-content-center mx-auto col-5">
          <p className="p-text d-flex align-items-center">
            As a player you can choose between 3 pre-built chracters or create
            your own character!
          </p>
          <img
            src="https://i.imgur.com/W2058Pr.png"
            alt="wizard"
            style={{ width: 298, height: 298 }}
          />
        </div>
        <div className="d-flex flex-row justify-content-center mx-auto col-5 my-2">
          <img
            src="https://i.imgur.com/25MiKZy.png"
            alt="rogue"
            style={{ width: 298, height: 298 }}
          />
          <p className="p-text d-flex align-items-center">
            As a player you can choose between 3 pre-built chracters or create
            your own character!
          </p>
        </div>
        <div className="d-flex flex-row justify-content-center mx-auto col-5">
          <p className="p-text d-flex align-items-center">
            As a player you can choose between 3 pre-built chracters or create
            your own character!
          </p>
          <img
            src="https://i.imgur.com/jbVIrpI.png"
            alt="fighter"
            style={{ width: 298, height: 298 }}
          />
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default About;
