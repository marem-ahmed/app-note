import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/Token';
export default function NavBar() {
let { Token, setToken } = useContext(TokenContext)||{};
Token=localStorage.getItem('userToken')
    console.log(Token, "tokentoken");

  const navigate=useNavigate()
   function logout() {
     localStorage.removeItem("userToken");
     navigate("/login");
   }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a
            className="navbar-brand lobster-regular main-color-text fs-4"
            href="/home"
          >
            NOTES
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {Token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active Poppins-regular text-muted"
                    aria-current="page"
                    href="/home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active Poppins-regular text-muted "
                    aria-current="page"
                    href="/login"
                    onClick={logout}
                  >
                    LogOut
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active Poppins-regular text-muted"
                    aria-current="page"
                    href="/resigster"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active Poppins-regular text-muted"
                    aria-current="page"
                    href="/login"
                  >
                    login
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
