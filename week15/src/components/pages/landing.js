import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div className="d-flex flex-column">
      <img src="https://i.imgur.com/k1U3u5n.png" alt="banner" className="img-fluid" />
      <Link to={"home"} className="mx-auto my-3 btn btn-warning border w-25">
        Enter
      </Link>
      </div>
    </div>
  );
}

export default Landing;
