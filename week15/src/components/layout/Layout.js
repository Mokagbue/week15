import Nav from "./nav";
// import Footer from "./footer";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div className="App">
        <Nav />
        <div className="container-fluid">
            <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
