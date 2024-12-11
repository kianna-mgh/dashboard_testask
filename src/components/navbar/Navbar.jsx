import { useNavigate } from "react-router";
import classes from "./Navbar.module.css";
const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <nav className={`navbar  ${classes.nav_bar}`}>
      <div className={`container-fluid ${classes.nav_mcont}`}>
        <div className={`row m-0 justify-content-between ${classes.nav_mrow}`}>
          <div className={`col-4 ${classes.nav_tit}`}>
            <h6 className="mb-0">Dashboard</h6>
          </div>
          <div className={`col-2 ${classes.nav_but}`}>
            <button
              type="button"
              className="btn btn_cusmain_wt"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
