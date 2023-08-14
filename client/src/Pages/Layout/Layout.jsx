import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <div>
          <Link to="/">Employees</Link>
          </div>
          <div>
          <Link to="/equipment">Equipment</Link>
          </div>
        </li>
     
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
          <Link to="/equipment/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
