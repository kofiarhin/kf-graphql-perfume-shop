import { useState } from "react";
import { REGISTER_uSER } from "../../graphql/mutation/authMuation";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { loginSuccess, reset } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

// register
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_uSER);
  const [formData, setFormData] = useState({
    name: "test arhin",
    email: "test3@gmail.com",
    password: "password",
  });

  const { email, password, name } = formData;

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
      const { data, error } = await registerUser({
        variables: {
          registerUserInput: {
            name,
            email,
            password,
          },
        },
      });

      if (data && data.registerUser) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className="heading">Register</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter email address"
              onChange={handleChange}
              value={name}
            />
          </div>

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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
