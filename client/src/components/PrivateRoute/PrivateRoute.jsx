import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
