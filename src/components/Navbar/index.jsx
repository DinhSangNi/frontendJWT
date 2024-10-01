import "./Navbar.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Tippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { logoutUser } from "../../redux/apiRequest";

function Navbar() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(
      currentUser?._id,
      dispatch,
      navigate,
      currentUser?.accessToken,
      axiosJWT
    );
  };

  return (
    <nav class="navbar navbar-expand-lg bg-danger-subtle">
      <div class="container navbar-container">
        <a class="navbar-brand navbar-logo col-lg-4" href="/">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse collapse-container"
          id="navbarSupportedContent"
        >
          <div>
            <form class="d-flex mt-2" role="search">
              <input
                class="form-control me-2 pe-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {currentUser ? (
                <>
                  {/* Shopping cart Block */}
                  <li class="nav-item cart-block">
                    <Link>
                      <i class="fa-solid fa-cart-shopping"></i>
                    </Link>
                  </li>
                  {/* User Block */}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    delay={[0, 500]}
                    render={(attrs) => {
                      return (
                        <div className="user-menu" tabIndex="-1" {...attrs}>
                          <div className="menu-item">
                            <i class="fa-regular fa-user"></i>
                            <p>Profile</p>
                          </div>
                          <div className="menu-item" onClick={handleLogout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <p>Logout</p>
                          </div>
                        </div>
                      );
                    }}
                  >
                    <li class="nav-item user-block">
                      <i class="fa fa-user"></i>
                      <p>Hi, User</p>
                    </li>
                  </Tippy>
                </>
              ) : (
                <>
                  <li className="register">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="login">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
