import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };
  return (
    <header>
      <div className="container">
        <h1>Logo</h1>
        <nav>
          <Link to="/"> Home</Link>
          {user ? (
            <>
              <button onClick={handleLogout}> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"> Login</Link>
              <Link to="/register"> Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
