import { useState } from "react";
import { LOGIN_USER } from "../../graphql/mutation/authMuation";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { loginSuccess, reset } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

// login
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const [formData, setFormData] = useState({
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await loginUser({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });

      if (data && data.loginUser) {
        localStorage.setItem("user", JSON.stringify(data.loginUser));
        dispatch(loginSuccess(data.loginUser));
        dispatch(reset());
        navigate("/profile");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className="heading">Login</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
              value={email}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
