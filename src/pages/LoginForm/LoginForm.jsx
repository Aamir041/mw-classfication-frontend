import { useState } from "react";
import "./LoginForm.css";
import { makeUnAuthenticatedPOSTRequest } from "../../utils/helper";
import Notification from "../../components/Notification/Notification";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const LoginForm = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const credentials = validateUsernameAndPassword(username, password);

    if (!credentials) return;

    try {
      const response = await makeUnAuthenticatedPOSTRequest("/users/login", credentials);
      if (response?.status >= 400) {
        showError(response?.message);
        return;
      }
      else {
        const token = response?.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        navigate("/");
      }
    }
    catch (error) {
      showError(error.message);
    }
  }

  const validateUsernameAndPassword = (username, password) => {
    username = username.replace(/\s/g, '');
    password = password.replace(/\s/g, '');

    if (username == null || username?.length == 0) {
      showError("Enter username");
      return null;
    }
    if (password == null || password?.length == 0) {
      showError("Enter password");
      return null;
    }
    return { username, password };
  }

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3500);
  }

  return (
    <div className="login-form">

      <div className="login-form-background">
        <div className="login-form-background-shape"></div>
        <div className="login-form-background-shape"></div>
      </div>

      <form onSubmit={(e) => login(e)}>

        <div className="login-form-form">
          <h3>Login</h3>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Enter Username" autoComplete="off" id="username" onChange={(e) => { setUsername(e.target.value) }} />

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

          <button onClick={login}>Log In</button>
          <div>
            <div>Don't have an account ? <Link to={"/signup"}>Sign Up</Link> </div>
          </div>
        </div>
      </form>

      {
        error && <Notification msg={error} errorColor={"red"} />
      }

    </div>
  );
};

export default LoginForm;
