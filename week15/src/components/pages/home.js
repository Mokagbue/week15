import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <img
          src="https://i.imgur.com/AWDrJmG.png"
          alt="banner home"
          className="img-fluid my-3"
        />
        <h1>Adventure Tyme</h1>
        <div>
          <div>
            <p className="p-text">Adventure Tyme is a Text Based Choose Your Own Adventure Fantasy Game.</p>
            <p className="p-text">Created using React and a JSON-server API.</p>
          </div>
          <div>
            <Link
              to={"game"}
              className="mx-auto my-3 btn btn-warning border w-25"
            >
              Enter
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Home;
